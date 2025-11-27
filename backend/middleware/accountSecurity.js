import logger from './logger.js';

// Stockage en mémoire pour les tentatives échouées (en production, utiliser Redis ou DB)
const failedAttempts = new Map();
const blockedIPs = new Map();

// Configuration
const MAX_ATTEMPTS = 10; // Plus permissif pour le développement
const BLOCK_DURATION = 5 * 60 * 1000; // 5 minutes seulement
const ATTEMPT_WINDOW = 24 * 60 * 60 * 1000; // 24 heures

// Comptes demo exemptés du blocage
const DEMO_ACCOUNTS = ['test@demo.com', 'demo@test.com', 'admin@test.com', 'business@test.com', 'user@test.com'];

// Fonction pour nettoyer les anciennes tentatives
const cleanOldAttempts = () => {
  const now = Date.now();
  
  // Nettoyer les tentatives expirées
  for (const [key, data] of failedAttempts.entries()) {
    if (now - data.lastAttempt > ATTEMPT_WINDOW) {
      failedAttempts.delete(key);
    }
  }
  
  // Nettoyer les IPs débloquées
  for (const [ip, blockTime] of blockedIPs.entries()) {
    if (now - blockTime > BLOCK_DURATION) {
      blockedIPs.delete(ip);
    }
  }
};

// Enregistrer une tentative échouée
export const recordFailedAttempt = (req, email) => {
  // Exemption pour les comptes demo
  if (DEMO_ACCOUNTS.includes(email?.toLowerCase())) {
    logger.info(`Tentative échouée exemptée pour compte demo: ${email}`, req);
    return false; // Pas de blocage pour les comptes demo
  }
  
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const key = `${ip}-${email}`;
  const now = Date.now();
  
  // Nettoyer les anciennes tentatives
  cleanOldAttempts();
  
  // Vérifier si l'IP est déjà bloquée
  if (blockedIPs.has(ip)) {
    const blockTime = blockedIPs.get(ip);
    if (now - blockTime < BLOCK_DURATION) {
      logger.warn(`Tentative de connexion sur IP bloquée: ${ip} pour ${email}`, req);
      return true; // Toujours bloqué
    } else {
      // Débloquer l'IP
      blockedIPs.delete(ip);
    }
  }
  
  // Récupérer ou initialiser les tentatives pour cette combinaison IP-email
  let attempts = failedAttempts.get(key) || {
    count: 0,
    firstAttempt: now,
    lastAttempt: now
  };
  
  // Si la dernière tentative est trop ancienne, réinitialiser
  if (now - attempts.lastAttempt > ATTEMPT_WINDOW) {
    attempts = {
      count: 0,
      firstAttempt: now,
      lastAttempt: now
    };
  }
  
  // Incrémenter le compteur
  attempts.count++;
  attempts.lastAttempt = now;
  failedAttempts.set(key, attempts);
  
  // Logger la tentative échouée
  logger.loginFailed(email, ip, req);
  
  // Vérifier si on doit bloquer
  if (attempts.count >= MAX_ATTEMPTS) {
    blockedIPs.set(ip, now);
    logger.error(`IP bloquée après ${MAX_ATTEMPTS} tentatives échouées: ${ip} pour ${email}`, req);
    
    // Nettoyer les tentatives pour cette clé puisque l'IP est bloquée
    failedAttempts.delete(key);
    
    return true; // IP bloquée
  }
  
  return false; // Pas encore bloqué
};

// Enregistrer une connexion réussie
export const recordSuccessfulLogin = (req, email, role) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const key = `${ip}-${email}`;
  
  // Supprimer les tentatives échouées pour cette combinaison
  failedAttempts.delete(key);
  
  // Logger la connexion réussie
  logger.loginSuccess(email, role, req);
};

// Vérifier si une IP/email est bloquée
export const isBlocked = (req, email) => {
  // Exemption pour les comptes demo
  if (DEMO_ACCOUNTS.includes(email?.toLowerCase())) {
    return { blocked: false }; // Jamais bloqué pour les comptes demo
  }
  
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  
  // Nettoyer les anciennes données
  cleanOldAttempts();
  
  // Vérifier si l'IP est bloquée
  if (blockedIPs.has(ip)) {
    const blockTime = blockedIPs.get(ip);
    if (now - blockTime < BLOCK_DURATION) {
      return {
        blocked: true,
        remainingTime: BLOCK_DURATION - (now - blockTime),
        reason: 'IP temporairement bloquée après tentatives échouées'
      };
    } else {
      // Débloquer l'IP expirée
      blockedIPs.delete(ip);
    }
  }
  
  return { blocked: false };
};

// Obtenir les statistiques de sécurité
export const getSecurityStats = () => {
  cleanOldAttempts();
  
  return {
    activeFailedAttempts: failedAttempts.size,
    blockedIPs: blockedIPs.size,
    configuration: {
      maxAttempts: MAX_ATTEMPTS,
      blockDuration: BLOCK_DURATION / 60000, // en minutes
      attemptWindow: ATTEMPT_WINDOW / (60 * 60 * 1000) // en heures
    },
    blockedIPsList: Array.from(blockedIPs.entries()).map(([ip, blockTime]) => ({
      ip,
      blockedAt: new Date(blockTime).toISOString(),
      remainingTime: Math.max(0, BLOCK_DURATION - (Date.now() - blockTime))
    }))
  };
};

// Débloquer manuellement une IP (fonction admin)
export const unblockIP = (ip, adminEmail, req = null) => {
  if (blockedIPs.has(ip)) {
    blockedIPs.delete(ip);
    logger.adminAction(`Débloquage IP ${ip}`, adminEmail, ip, req);
    return true;
  }
  return false;
};

// Middleware de vérification de sécurité
export const securityMiddleware = (req, res, next) => {
  // Seulement pour les routes de login
  if (req.path === '/login' || req.path === '/api/auth/login') {
    const { email } = req.body;
    
    if (email) {
      const blockStatus = isBlocked(req, email);
      if (blockStatus.blocked) {
        return res.status(429).json({
          success: false,
          message: 'Trop de tentatives échouées. Votre IP est temporairement bloquée.',
          blocked: true,
          remainingTime: Math.ceil(blockStatus.remainingTime / 60000), // en minutes
          retryAfter: Math.ceil(blockStatus.remainingTime / 1000) // en secondes
        });
      }
    }
  }
  
  next();
};

// Fonction de nettoyage périodique (à appeler régulièrement)
export const periodicCleanup = () => {
  cleanOldAttempts();
  logger.info(`Nettoyage sécurité: ${failedAttempts.size} tentatives actives, ${blockedIPs.size} IPs bloquées`);
};

// Démarrer le nettoyage automatique toutes les heures
setInterval(periodicCleanup, 60 * 60 * 1000);

export default {
  recordFailedAttempt,
  recordSuccessfulLogin,
  isBlocked,
  getSecurityStats,
  unblockIP,
  securityMiddleware,
  periodicCleanup
};
