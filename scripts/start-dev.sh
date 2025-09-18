#!/bin/bash
echo "🚀 Lancement backend (http://localhost:5000)"
cd backend
PORT=5000 npm run dev &

sleep 3

echo "🚀 Lancement frontend (http://localhost:3000)"
cd ../frontend
npm run dev
