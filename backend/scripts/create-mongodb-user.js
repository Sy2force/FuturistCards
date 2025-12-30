// Script pour create automatiquement un user MongoDB Atlas
require('dotenv').config();

// Guide de configuration MongoDB Atlas
// 1. Aller sur https://cloud.mongodb.com/
// 2. Se connecter avec votre compte MongoDB Atlas
// 3. Sélectionner votre projet/cluster
// 4. Database Access → Add New Database User
// 5. Authentication Method: Password
// 6. Username: cardpro-admin
// 7. Password: FuturistCards2025!
// 8. Database User Privileges: Built-in Role → readWriteAnyDatabase
// 9. Network Access → Add IP Address → 0.0.0.0/0

const newUri = 'mongodb+srv://cardpro-admin:FuturistCards2025!@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority&authSource=admin';

// Variables d'environnement pour Render:
// MONGO_URI=mongodb+srv://cardpro-admin:FuturistCards2025!@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority&authSource=admin
// JWT_SECRET=super-secret-cardpro-2025-production-key
// NODE_ENV=production
// CORS_ORIGIN=https://futuristcards.vercel.app
// PORT=5001
