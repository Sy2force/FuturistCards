import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer le dossier logs s'il n'existe pas
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Fonction pour formatter la date (YYYY-MM-DD)
const formatDate = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

// Fonction pour formatter le timestamp complet
const formatTimestamp = (date = new Date()) => {
  return date.toISOString();
};

// Logger principal
class Logger {
  constructor() {
    this.logsDir = logsDir;
  }

  // Écrire dans le fichier de log quotidien
  writeLog(level, message, req = null, error = null) {
    try {
      const date = formatDate();
      const logFile = path.join(this.logsDir, `${date}.txt`);
      
      let logEntry = `${formatTimestamp()} [${level.toUpperCase()}]`;
      
      if (req) {
        const ip = req.ip || req.connection.remoteAddress || 'unknown';
        const userAgent = req.get('User-Agent') || 'unknown';
        const userId = req.user?.id || 'anonymous';
        
        logEntry += ` IP:${ip} User:${userId} ${req.method} ${req.originalUrl || req.url}`;
      }
      
      logEntry += ` - ${message}`;
      
      if (error) {
        logEntry += `\nError Stack: ${error.stack}`;
      }
      
      logEntry += '\n';
      
      fs.appendFileSync(logFile, logEntry);
      
    } catch (err) {
      console.error('Erreur lors de l\'écriture du log:', err);
    }
  }

  // Méthodes de logging par niveau
  info(message, req = null) {
    this.writeLog('info', message, req);
  }

  warn(message, req = null) {
    this.writeLog('warn', message, req);
  }

  error(message, req = null, error = null) {
    this.writeLog('error', message, req, error);
  }

  debug(message, req = null) {
    if (process.env.NODE_ENV === 'development') {
      this.writeLog('debug', message, req);
    }
  }

  // Log des tentatives de connexion échouées
  loginFailed(email, ip, req = null) {
    this.writeLog('security', `Tentative de connexion échouée pour ${email}`, req);
  }

  // Log des tentatives de connexion réussies
  loginSuccess(email, role, req = null) {
    this.writeLog('security', `Connexion réussie pour ${email} (${role})`, req);
  }

  // Log des actions administratives
  adminAction(action, adminEmail, targetId, req = null) {
    this.writeLog('admin', `Action admin: ${action} par ${adminEmail} sur ${targetId}`, req);
  }

  // Nettoyer les anciens logs (garde les 30 derniers jours)
  cleanOldLogs() {
    try {
      const files = fs.readdirSync(this.logsDir);
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

      files.forEach(file => {
        if (file.match(/^\d{4}-\d{2}-\d{2}\.txt$/)) {
          const fileDate = new Date(file.replace('.txt', ''));
          if (fileDate < thirtyDaysAgo) {
            const filePath = path.join(this.logsDir, file);
            fs.unlinkSync(filePath);
            console.log(`Log supprimé: ${file}`);
          }
        }
      });
    } catch (error) {
      console.error('Erreur lors du nettoyage des logs:', error);
    }
  }

  // Obtenir les statistiques des logs
  getLogStats(days = 7) {
    try {
      const stats = {
        totalLogs: 0,
        errorCount: 0,
        warningCount: 0,
        securityEvents: 0,
        adminActions: 0,
        files: []
      };

      const now = new Date();
      for (let i = 0; i < days; i++) {
        const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        const filename = `${formatDate(date)}.txt`;
        const filepath = path.join(this.logsDir, filename);

        if (fs.existsSync(filepath)) {
          const content = fs.readFileSync(filepath, 'utf8');
          const lines = content.split('\n').filter(line => line.trim());
          
          stats.totalLogs += lines.length;
          stats.errorCount += lines.filter(line => line.includes('[ERROR]')).length;
          stats.warningCount += lines.filter(line => line.includes('[WARN]')).length;
          stats.securityEvents += lines.filter(line => line.includes('[SECURITY]')).length;
          stats.adminActions += lines.filter(line => line.includes('[ADMIN]')).length;
          
          stats.files.push({
            date: formatDate(date),
            lines: lines.length,
            size: fs.statSync(filepath).size
          });
        }
      }

      return stats;
    } catch (error) {
      console.error('Erreur lors de la récupération des stats:', error);
      return null;
    }
  }
}

// Instance globale du logger
const logger = new Logger();

// Middleware express pour logging automatique
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Log de la requête entrante
  if (req.method !== 'GET' || process.env.NODE_ENV === 'development') {
    logger.info(`Requête ${req.method} ${req.originalUrl}`, req);
  }
  
  // Override de res.json pour logger les réponses d'erreur
  const originalJson = res.json;
  res.json = function(data) {
    const responseTime = Date.now() - startTime;
    
    if (res.statusCode >= 400) {
      logger.error(`Réponse ${res.statusCode} en ${responseTime}ms`, req);
    } else if (responseTime > 5000) { // Requêtes lentes
      logger.warn(`Requête lente: ${responseTime}ms`, req);
    }
    
    return originalJson.call(this, data);
  };
  
  next();
};

// Middleware pour capturer les erreurs non gérées
export const errorLogger = (err, req, res, next) => {
  logger.error(`Erreur non gérée: ${err.message}`, req, err);
  next(err);
};

export default logger;
