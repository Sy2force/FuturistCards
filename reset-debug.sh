#!/bin/bash

# ===================================================================
# 🚀 FUTURISTCARDS RESET & DEBUG SCRIPT
# ===================================================================
# Script universel de réinitialisation et relancement pour projet 
# full-stack React + Node.js compatible Mac (zsh/bash) et Windows (Git Bash)
# 
# Usage:
#   ./reset-debug.sh frontend  → Reset uniquement frontend
#   ./reset-debug.sh backend   → Reset uniquement backend  
#   ./reset-debug.sh all       → Reset complet (défaut)
#
# Auteur: Shaï Acoca - FuturistCards Project
# Version: 1.0.0
# ===================================================================

# Configuration des couleurs et emojis
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Détection de l'OS pour compatibilité
OS_TYPE="unknown"
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS_TYPE="mac"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS_TYPE="linux"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    OS_TYPE="windows"
fi

# Fonction d'affichage avec couleurs et logging
log_message() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case $level in
        "INFO")
            echo -e "${BLUE}ℹ️  ${message}${NC}" | tee -a reset-debug.log
            ;;
        "SUCCESS")
            echo -e "${GREEN}✅ ${message}${NC}" | tee -a reset-debug.log
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠️  ${message}${NC}" | tee -a reset-debug.log
            ;;
        "ERROR")
            echo -e "${RED}❌ ${message}${NC}" | tee -a reset-debug.log
            ;;
        "HEADER")
            echo -e "${PURPLE}🎯 ${message}${NC}" | tee -a reset-debug.log
            ;;
    esac
    echo "[$timestamp] [$level] $message" >> reset-debug.log
}

# Fonction pour tuer les processus par nom
kill_processes() {
    local process_name=$1
    log_message "INFO" "Arrêt des processus: $process_name"
    
    if [[ "$OS_TYPE" == "windows" ]]; then
        # Windows (Git Bash/PowerShell)
        taskkill //F //IM "$process_name.exe" 2>/dev/null || true
    else
        # Mac/Linux
        pkill -f "$process_name" 2>/dev/null || true
        # Alternative avec killall si pkill échoue
        killall "$process_name" 2>/dev/null || true
    fi
}

# Fonction pour libérer un port spécifique
free_port() {
    local port=$1
    log_message "INFO" "Vérification du port $port"
    
    if [[ "$OS_TYPE" == "windows" ]]; then
        # Windows
        local pid=$(netstat -ano | findstr ":$port " | awk '{print $5}' | head -1)
        if [[ -n "$pid" ]]; then
            log_message "WARNING" "Port $port occupé par PID $pid - Libération..."
            taskkill //F //PID "$pid" 2>/dev/null || true
        fi
    else
        # Mac/Linux
        local pid=$(lsof -ti:$port 2>/dev/null)
        if [[ -n "$pid" ]]; then
            log_message "WARNING" "Port $port occupé par PID $pid - Libération..."
            kill -9 $pid 2>/dev/null || true
        fi
    fi
    
    log_message "SUCCESS" "Port $port libéré"
}

# Fonction pour supprimer les caches et artefacts
clean_artifacts() {
    local target_dir=$1
    log_message "INFO" "Nettoyage des artefacts dans: $target_dir"
    
    cd "$target_dir" 2>/dev/null || {
        log_message "ERROR" "Impossible d'accéder au répertoire: $target_dir"
        return 1
    }
    
    # Suppression des dossiers de cache et build
    local dirs_to_remove=(
        "node_modules"
        "dist"
        "build"
        ".vite"
        ".turbo"
        ".next"
        "playwright-report"
        "test-results"
        "coverage"
        ".nyc_output"
    )
    
    for dir in "${dirs_to_remove[@]}"; do
        if [[ -d "$dir" ]]; then
            log_message "INFO" "Suppression: $dir"
            rm -rf "$dir"
        fi
    done
    
    # Suppression des fichiers spécifiques
    find . -name ".DS_Store" -delete 2>/dev/null || true
    find . -name "*.log" -not -name "reset-debug.log" -delete 2>/dev/null || true
    find . -name "npm-debug.log*" -delete 2>/dev/null || true
    find . -name "yarn-debug.log*" -delete 2>/dev/null || true
    find . -name "yarn-error.log*" -delete 2>/dev/null || true
    
    # Suppression des .env locaux (protection des .env.example)
    if [[ -f ".env.local" ]]; then
        log_message "WARNING" "Suppression: .env.local"
        rm -f ".env.local"
    fi
    
    log_message "SUCCESS" "Nettoyage terminé pour: $target_dir"
}

# Fonction pour installer les dépendances
install_dependencies() {
    local target_dir=$1
    log_message "INFO" "Installation des dépendances dans: $target_dir"
    
    cd "$target_dir" 2>/dev/null || {
        log_message "ERROR" "Impossible d'accéder au répertoire: $target_dir"
        return 1
    }
    
    if [[ -f "package.json" ]]; then
        log_message "INFO" "Exécution: npm install --force"
        npm install --force 2>&1 | tee -a ../reset-debug.log
        
        if [[ $? -eq 0 ]]; then
            log_message "SUCCESS" "Dépendances installées avec succès"
        else
            log_message "ERROR" "Échec de l'installation des dépendances"
            return 1
        fi
    else
        log_message "WARNING" "Aucun package.json trouvé dans: $target_dir"
    fi
}

# Fonction de vérification ESLint
run_eslint_check() {
    local target_dir=$1
    local file_extensions=$2
    
    log_message "INFO" "Vérification ESLint dans: $target_dir"
    
    cd "$target_dir" 2>/dev/null || {
        log_message "ERROR" "Impossible d'accéder au répertoire: $target_dir"
        return 1
    }
    
    if [[ -f "package.json" ]] && grep -q "eslint" package.json; then
        log_message "INFO" "Exécution: npx eslint src $file_extensions"
        npx eslint src $file_extensions 2>&1 | tee -a ../reset-debug.log
        
        if [[ $? -eq 0 ]]; then
            log_message "SUCCESS" "ESLint: Aucune erreur détectée"
        else
            log_message "WARNING" "ESLint: Erreurs détectées (voir logs)"
        fi
    else
        log_message "INFO" "ESLint non configuré dans: $target_dir"
    fi
}

# Fonction pour générer .env.example
generate_env_example() {
    local target_dir=$1
    local env_type=$2
    
    cd "$target_dir" 2>/dev/null || return 1
    
    if [[ ! -f ".env" ]] && [[ ! -f ".env.example" ]]; then
        log_message "INFO" "Génération de .env.example pour: $env_type"
        
        case $env_type in
            "backend")
                cat > .env.example << 'EOF'
# Backend Configuration
PORT=5001
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/futuristcards?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF
                ;;
            "frontend")
                cat > .env.example << 'EOF'
# Frontend Configuration
VITE_API_BASE_URL=http://localhost:5001/api
VITE_APP_NAME=FuturistCards
VITE_APP_VERSION=1.0.0

# Development
VITE_DEV_MODE=true
VITE_SHOW_DEBUG=false

# Analytics (optional)
VITE_ANALYTICS_ID=your-analytics-id
EOF
                ;;
        esac
        
        log_message "SUCCESS" "Fichier .env.example généré"
    fi
}

# Fonction pour exécuter le seed de la base de données
run_database_seed() {
    log_message "INFO" "Exécution du seed de la base de données"
    
    cd backend 2>/dev/null || {
        log_message "ERROR" "Répertoire backend introuvable"
        return 1
    }
    
    if [[ -f "scripts/seed-database.js" ]]; then
        log_message "INFO" "Exécution: node scripts/seed-database.js"
        node scripts/seed-database.js 2>&1 | tee -a ../reset-debug.log
        
        if [[ $? -eq 0 ]]; then
            log_message "SUCCESS" "Base de données initialisée avec succès"
        else
            log_message "WARNING" "Échec de l'initialisation de la base de données"
        fi
    elif [[ -f "seed-database.js" ]]; then
        log_message "INFO" "Exécution: node seed-database.js"
        node seed-database.js 2>&1 | tee -a ../reset-debug.log
    else
        log_message "WARNING" "Script seed-database.js introuvable"
    fi
    
    cd ..
}

# Fonction pour démarrer les services
start_services() {
    local mode=$1
    
    log_message "HEADER" "Démarrage des services"
    
    # Démarrage du backend
    if [[ "$mode" == "backend" ]] || [[ "$mode" == "all" ]]; then
        log_message "INFO" "Démarrage du backend sur le port 5001"
        cd backend 2>/dev/null || {
            log_message "ERROR" "Répertoire backend introuvable"
            return 1
        }
        
        # Démarrage en arrière-plan avec nodemon ou node
        if command -v nodemon &> /dev/null; then
            PORT=5001 nohup nodemon server.js > ../backend.log 2>&1 &
            log_message "SUCCESS" "Backend démarré avec nodemon (PID: $!)"
        else
            PORT=5001 nohup node server.js > ../backend.log 2>&1 &
            log_message "SUCCESS" "Backend démarré avec node (PID: $!)"
        fi
        
        cd ..
        sleep 3  # Attendre que le backend démarre
    fi
    
    # Démarrage du frontend
    if [[ "$mode" == "frontend" ]] || [[ "$mode" == "all" ]]; then
        log_message "INFO" "Démarrage du frontend sur le port 3000"
        cd frontend 2>/dev/null || {
            log_message "ERROR" "Répertoire frontend introuvable"
            return 1
        }
        
        # Démarrage en arrière-plan
        nohup npm run dev > ../frontend.log 2>&1 &
        log_message "SUCCESS" "Frontend démarré (PID: $!)"
        
        cd ..
        sleep 3  # Attendre que le frontend démarre
    fi
}

# Fonction principale
main() {
    local mode=${1:-"all"}
    
    # Initialisation du fichier de log
    echo "=== FUTURISTCARDS RESET DEBUG SCRIPT ===" > reset-debug.log
    echo "Démarrage: $(date)" >> reset-debug.log
    echo "Mode: $mode" >> reset-debug.log
    echo "OS: $OS_TYPE" >> reset-debug.log
    echo "=========================================" >> reset-debug.log
    
    log_message "HEADER" "🚀 FUTURISTCARDS RESET & DEBUG SCRIPT"
    log_message "INFO" "Mode sélectionné: $mode"
    log_message "INFO" "Système détecté: $OS_TYPE"
    
    # Validation du mode
    if [[ "$mode" != "frontend" ]] && [[ "$mode" != "backend" ]] && [[ "$mode" != "all" ]]; then
        log_message "ERROR" "Mode invalide. Utilisez: frontend, backend, ou all"
        echo ""
        echo "Usage:"
        echo "  ./reset-debug.sh frontend  → Reset uniquement frontend"
        echo "  ./reset-debug.sh backend   → Reset uniquement backend"
        echo "  ./reset-debug.sh all       → Reset complet (défaut)"
        exit 1
    fi
    
    # Étape 1: Arrêt des processus
    log_message "HEADER" "📋 Étape 1: Arrêt des processus"
    kill_processes "node"
    kill_processes "nodemon"
    kill_processes "npm"
    kill_processes "vite"
    sleep 2
    
    # Étape 2: Libération des ports
    log_message "HEADER" "🔌 Étape 2: Libération des ports"
    if [[ "$mode" == "frontend" ]] || [[ "$mode" == "all" ]]; then
        free_port 3000
    fi
    if [[ "$mode" == "backend" ]] || [[ "$mode" == "all" ]]; then
        free_port 5001
    fi
    
    # Étape 3: Nettoyage des artefacts
    log_message "HEADER" "🧹 Étape 3: Nettoyage des artefacts"
    if [[ "$mode" == "frontend" ]] || [[ "$mode" == "all" ]]; then
        clean_artifacts "frontend"
    fi
    if [[ "$mode" == "backend" ]] || [[ "$mode" == "all" ]]; then
        clean_artifacts "backend"
    fi
    
    # Étape 4: Génération des .env.example
    log_message "HEADER" "📝 Étape 4: Génération des fichiers de configuration"
    if [[ "$mode" == "frontend" ]] || [[ "$mode" == "all" ]]; then
        generate_env_example "frontend" "frontend"
    fi
    if [[ "$mode" == "backend" ]] || [[ "$mode" == "all" ]]; then
        generate_env_example "backend" "backend"
    fi
    
    # Étape 5: Installation des dépendances
    log_message "HEADER" "📦 Étape 5: Installation des dépendances"
    if [[ "$mode" == "frontend" ]] || [[ "$mode" == "all" ]]; then
        install_dependencies "frontend"
    fi
    if [[ "$mode" == "backend" ]] || [[ "$mode" == "all" ]]; then
        install_dependencies "backend"
    fi
    
    # Étape 6: Vérification ESLint
    log_message "HEADER" "🔍 Étape 6: Vérification ESLint"
    if [[ "$mode" == "frontend" ]] || [[ "$mode" == "all" ]]; then
        run_eslint_check "frontend" "--ext .jsx,.js,.tsx,.ts"
    fi
    if [[ "$mode" == "backend" ]] || [[ "$mode" == "all" ]]; then
        run_eslint_check "backend" "--ext .js,.ts"
    fi
    
    # Étape 7: Seed de la base de données (uniquement pour reset complet)
    if [[ "$mode" == "all" ]]; then
        log_message "HEADER" "🌱 Étape 7: Initialisation de la base de données"
        run_database_seed
    fi
    
    # Étape 8: Démarrage des services
    log_message "HEADER" "🚀 Étape 8: Démarrage des services"
    start_services "$mode"
    
    # Étape 9: Affichage final
    log_message "HEADER" "🎉 RESET ET DÉMARRAGE TERMINÉS"
    echo ""
    echo -e "${WHITE}╔══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${WHITE}║                    🌟 ACCÈS AUX SERVICES 🌟               ║${NC}"
    echo -e "${WHITE}╠══════════════════════════════════════════════════════════╣${NC}"
    
    if [[ "$mode" == "frontend" ]] || [[ "$mode" == "all" ]]; then
        echo -e "${WHITE}║ 🌐 Frontend (React + Vite):                             ║${NC}"
        echo -e "${WHITE}║    ${CYAN}http://localhost:3000${WHITE}                              ║${NC}"
    fi
    
    if [[ "$mode" == "backend" ]] || [[ "$mode" == "all" ]]; then
        echo -e "${WHITE}║ 🛠  Backend API (Node.js + Express):                    ║${NC}"
        echo -e "${WHITE}║    ${CYAN}http://localhost:5001/api${WHITE}                          ║${NC}"
    fi
    
    echo -e "${WHITE}║                                                          ║${NC}"
    echo -e "${WHITE}║ 📋 Logs disponibles:                                    ║${NC}"
    echo -e "${WHITE}║    • reset-debug.log (ce script)                        ║${NC}"
    echo -e "${WHITE}║    • frontend.log (serveur frontend)                    ║${NC}"
    echo -e "${WHITE}║    • backend.log (serveur backend)                      ║${NC}"
    echo -e "${WHITE}╚══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    log_message "SUCCESS" "Script terminé avec succès!"
    log_message "INFO" "Consultez reset-debug.log pour les détails complets"
    
    # Attendre quelques secondes pour que les services démarrent
    log_message "INFO" "Vérification de l'état des services dans 5 secondes..."
    sleep 5
    
    # Vérification finale des services
    if [[ "$mode" == "backend" ]] || [[ "$mode" == "all" ]]; then
        if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
            log_message "SUCCESS" "✅ Backend opérationnel sur http://localhost:5001"
        else
            log_message "WARNING" "⚠️  Backend peut encore démarrer... Vérifiez backend.log"
        fi
    fi
    
    if [[ "$mode" == "frontend" ]] || [[ "$mode" == "all" ]]; then
        if curl -s http://localhost:3000 > /dev/null 2>&1; then
            log_message "SUCCESS" "✅ Frontend opérationnel sur http://localhost:3000"
        else
            log_message "WARNING" "⚠️  Frontend peut encore démarrer... Vérifiez frontend.log"
        fi
    fi
}

# Vérification des prérequis
check_prerequisites() {
    log_message "INFO" "Vérification des prérequis..."
    
    # Vérification de Node.js
    if ! command -v node &> /dev/null; then
        log_message "ERROR" "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérification de npm
    if ! command -v npm &> /dev/null; then
        log_message "ERROR" "npm n'est pas installé"
        exit 1
    fi
    
    log_message "SUCCESS" "Prérequis validés"
}

# Point d'entrée du script
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    check_prerequisites
    main "$@"
fi
