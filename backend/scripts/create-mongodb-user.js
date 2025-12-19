// Script pour créer automatiquement un utilisateur MongoDB Atlas
require('dotenv').config();

console.log('🔧 GUIDE CRÉATION UTILISATEUR MONGODB ATLAS');
console.log('='.repeat(50));

console.log('\n📝 ÉTAPES À SUIVRE:');
console.log('1. Aller sur https://cloud.mongodb.com/');
console.log('2. Se connecter avec votre compte MongoDB Atlas');
console.log('3. Sélectionner votre projet/cluster');

console.log('\n👤 CRÉER UN NOUVEL UTILISATEUR:');
console.log('   • Database Access → Add New Database User');
console.log('   • Authentication Method: Password');
console.log('   • Username: cardpro-admin');
console.log('   • Password: FuturistCards2025!');
console.log('   • Database User Privileges: Built-in Role → readWriteAnyDatabase');
console.log('   • Restrict Access to Specific Clusters: Votre cluster actuel');

console.log('\n🌐 CONFIGURER NETWORK ACCESS:');
console.log('   • Network Access → Add IP Address');
console.log('   • Access List Entry: 0.0.0.0/0 (Allow access from anywhere)');
console.log('   • Comment: "Development and Render deployment"');

console.log('\n🔗 NOUVELLE URI MONGODB:');
const newUri = 'mongodb+srv://cardpro-admin:FuturistCards2025!@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority&authSource=admin';
console.log(newUri);

console.log('\n⚡ COMMANDES DE TEST:');
console.log('cd backend');
console.log(`echo "MONGO_URI=${newUri}" > .env`);
console.log('node scripts/test-mongodb.js');
console.log('npm start');

console.log('\n🚀 VARIABLES POUR RENDER:');
console.log('MONGO_URI=' + newUri);
console.log('JWT_SECRET=super-secret-cardpro-2025-hack3ru-validé-✅');
console.log('NODE_ENV=production');
console.log('CORS_ORIGIN=https://futuristcards.vercel.app');
console.log('PORT=5001');

console.log('\n✅ APRÈS CRÉATION:');
console.log('   • Attendre 2-3 minutes pour propagation');
console.log('   • Tester avec le script de test');
console.log('   • Redémarrer le serveur');

console.log('\n' + '='.repeat(50));
console.log('📞 Support: Si problème persiste, créer un nouveau cluster gratuit');
