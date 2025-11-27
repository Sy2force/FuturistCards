#!/bin/bash

echo "🔁 [1/10] Nettoyage des processus Node.js..."
killall node 2>/dev/null || echo "✅ Aucun Node actif"

echo "🔄 [2/10] Redémarrage de MongoDB local..."
brew services restart mongodb-community@6.0 || mongod --dbpath /usr/local/var/mongodb

echo "📁 [3/10] Accès au projet FuturistCards..."
cd ~/projet\ react/FuturistCards || exit 1

echo "📦 [4/10] Installation des dépendances..."
cd backend && npm install && cd ../frontend && npm install && cd ..

echo "🌱 [5/10] Seed des utilisateurs et cartes de test..."
node -e "
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './backend/models/User.js';
import Card from './backend/models/Card.js';

mongoose.connect('mongodb://127.0.0.1:27017/fCardPro').then(async () => {
  const user = await User.findOne({ email: 'test@demo.com' });
  if (!user) {
    await User.create({
      name: 'Test',
      email: 'test@demo.com',
      password: await bcrypt.hash('Demo1234!', 10),
      role: 'user'
    });
    console.log('✅ Utilisateur de test créé');
  } else {
    console.log('ℹ️ Utilisateur déjà existant');
  }

  await Card.deleteMany({});
  await Card.create([
    {
      title: 'Test Card 1',
      subtitle: 'Sub 1',
      description: 'Test business card',
      phone: '050-0000000',
      email: 'biz@test.com',
      image: 'https://via.placeholder.com/150',
      address: { city: 'Tel Aviv', street: 'Rothschild', number: 10 }
    },
    {
      title: 'Test Card 2',
      subtitle: 'Sub 2',
      description: 'Another card',
      phone: '050-0000001',
      email: 'test2@test.com',
      image: 'https://via.placeholder.com/150',
      address: { city: 'Jerusalem', street: 'King George', number: 5 }
    }
  ]);
  console.log('✅ Cartes de test insérées');
  mongoose.disconnect();
}).catch(err => console.error('❌ Erreur de seed :', err));
"

echo "🚀 [6/10] Lancement du backend sur http://localhost:5010..."
cd backend
cross-env PORT=5010 node server.js &

echo "💻 [7/10] Lancement du frontend sur http://localhost:3010..."
cd ../frontend
PORT=3010 npm run dev &

echo "⏳ [8/10] Patiente 5s le temps que tout se lance..."
sleep 5

echo "📡 [9/10] Vérification API cards via proxy..."
curl -s http://localhost:3010/api/cards | grep title || echo "⚠️ API cards vide ou non accessible"

echo "🧪 [10/10] Lancement des tests Playwright..."
cd ../frontend
npx playwright test

echo "🎉 ✅ LANCEMENT TERMINÉ"
echo "🌐 Frontend  : http://localhost:3010"
echo "🛠️ Backend   : http://localhost:5010/api/health"
echo "🔐 Login test: test@demo.com / Demo1234!"
