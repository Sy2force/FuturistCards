# FuturistCards - Final Project (HackerU 2025)

🚀 **Plateforme SaaS de cartes de visite numériques avec design futuriste, authentification sécurisée, gestion CRUD, système de favoris et rôles utilisateurs.**

## 🔧 Stack Technique

### Frontend
- **React 18** - Framework moderne avec hooks et context
- **Vite** - Build tool rapide et serveur de développement
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations et transitions fluides
- **React Router v6** - Routage côté client
- **Axios** - Client HTTP pour les appels API

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework d'application web
- **MongoDB Atlas** - Base de données cloud
- **Mongoose** - Modélisation d'objets MongoDB
- **JWT** - Tokens d'authentification JSON
- **bcrypt** - Hachage de mots de passe
- **Joi** - Validation des données

### DevOps & Tests
- **Docker** - Containerisation
- **Playwright** - Tests end-to-end
- **Jest** - Tests unitaires
- **ESLint** - Linting du code
- **Prettier** - Formatage du code

## 📁 Structure du Projet

```
FuturistCards/
├── frontend/                 # Application React frontend
│   ├── src/
│   │   ├── components/      # Composants UI réutilisables
│   │   ├── pages/          # Composants de pages
│   │   ├── context/        # Providers React context
│   │   ├── hooks/          # Hooks React personnalisés
│   │   ├── services/       # Fonctions de service API
│   │   └── api/            # Configuration Axios
│   ├── public/             # Assets statiques
│   └── tests/              # Tests frontend (E2E)
├── backend/                 # API Node.js backend
│   ├── controllers/        # Contrôleurs de routes
│   ├── models/            # Modèles de base de données
│   ├── routes/            # Routes API
│   ├── middleware/        # Middleware personnalisé
│   ├── utils/             # Fonctions utilitaires
│   └── tests/             # Tests backend (Jest)
├── .env.example            # Variables d'environnement exemple
├── README.md              # Documentation du projet
├── docker-compose.yml     # Configuration Docker
└── package.json           # Scripts et dépendances racine
```

## 📦 Fonctionnalités

### 🔐 Authentification & Autorisation
- Inscription et connexion utilisateur sécurisées
- Authentification basée sur JWT avec tokens de rafraîchissement
- Contrôle d'accès basé sur les rôles (user, business, admin)
- Validation de mot de passe avec regex strict
- Routes protégées et middleware

### 📇 Gestion des Cartes de Visite
- **Create** - Créer des cartes personnalisées
- **Read** - Parcourir et rechercher des cartes
- **Update** - Modifier les cartes existantes
- **Delete** - Supprimer les cartes (propriétaire/admin uniquement)
- Filtrage avancé et fonctionnalité de recherche
- Organisation par catégories
- Support d'upload d'images (URL et base64)

### 💫 Expérience Utilisateur
- **Design Responsive** - Approche mobile-first
- **Mode Sombre/Clair** - Changement de thème avec persistance
- **Multilingue** - Support FR, EN, AR, HE avec RTL
- **UI Glassmorphisme** - Design moderne et futuriste
- **Animations Fluides** - Transitions Framer Motion
- **États de Chargement** - Feedback utilisateur amélioré

### 📊 Fonctionnalités Sociales
- Système Like/Unlike des cartes
- Système de favoris
- Suivi des vues
- Profils utilisateur
- Dashboard d'activité

### 🛡️ Sécurité
- Validation et assainissement des entrées
- Limitation du taux de requêtes
- Protection CORS
- En-têtes de sécurité Helmet
- Protection des variables d'environnement
- Prévention des injections SQL

## 🚀 Lancement Local

### Prérequis
- Node.js 18+ et npm
- Compte MongoDB Atlas
- Git

### Installation

```bash
# 1. Cloner le repository
git clone https://github.com/shayacoca/futuristcards.git
cd futuristcards

# 2. Installer les dépendances backend
cd backend
npm install

# 3. Installer les dépendances frontend
cd ../frontend
npm install

# 4. Configuration environnement
# Copier et éditer les fichiers .env.example

# 5. Démarrer l'application
# Backend (port 5001)
cd backend
npm run dev

# Frontend (port 3000)
cd frontend
npm run dev
```

## 🧪 Testing

### Test Accounts
- **Admin**: admin@futuristcards.com / AdminPass123!
- **Business**: john.doe@example.com / Password123!
- **User**: test@example.com / TestPass123!

### API Testing
```bash
# Health check
curl http://localhost:5001/api/health

# Register user
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"TestPass123!","role":"user"}'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123!"}'
```

## 📱 Screenshots

### Homepage
![Homepage](./docs/screenshots/homepage.png)
*Modern glassmorphic design with hero section and featured cards*

### Cards Gallery
![Cards Gallery](./docs/screenshots/cards.png)
*Browse and search through business cards with filtering options*

### Authentication
![Login](./docs/screenshots/login.png)
*Secure login with JWT authentication*

### Dashboard
![Dashboard](./docs/screenshots/dashboard.png)
*Admin dashboard with user management and analytics*

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/futuristcards

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_REFRESH_SECRET=your-refresh-token-secret-key
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# CORS
CLIENT_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001/api
VITE_APP_NAME=FuturistCards
VITE_APP_VERSION=1.0.0
```

## 🏗️ Project Structure

```
FuturistCards/
├── backend/                 # Node.js API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.js          # Entry point
├── frontend/               # React application
│   ├── src/
│   │   ├── api/           # API services
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── index.html         # HTML template
├── docs/                  # Documentation
└── README.md             # This file
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill processes on ports 3000 and 5001
lsof -ti:3000 | xargs kill -9
lsof -ti:5001 | xargs kill -9
```

#### MongoDB Connection Error
- Verify MongoDB Atlas connection string
- Check network access in MongoDB Atlas
- Ensure IP address is whitelisted
- Application runs in mock mode if MongoDB unavailable

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### CORS Issues
- Verify CLIENT_URL in backend .env
- Check API_URL in frontend .env
- Ensure ports match configuration

## 🚀 Deployment

### Netlify (Frontend)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Heroku (Backend)
1. Create Heroku app: `heroku create futuristcards-api`
2. Set environment variables: `heroku config:set MONGO_URI=...`
3. Deploy: `git push heroku main`

### Docker
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 📊 Performance

- **Frontend Bundle Size**: ~335KB (112KB gzipped)
- **API Response Time**: <100ms average
- **Database Queries**: Optimized with indexes
- **Image Loading**: Lazy loading implemented
- **Caching**: Browser caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 👨‍💻 Author

**Shaï Acoca** - Full Stack Developer
- GitHub: [@shayacoca](https://github.com/shayacoca)
- Email: shay@futuristcards.com

---

Built with ❤️ using React, Node.js, and MongoDB
