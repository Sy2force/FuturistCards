#!/bin/bash
echo "🧹 Démarrage du nettoyage complet des ports et processus de dev..."

# Liste des ports classiques à libérer
PORTS=(3000 3001 5000 5001 5173 5174 8080 8081)

# 🔪 Libère les ports spécifiques
for port in "${PORTS[@]}"; do
  pid=$(lsof -ti tcp:$port)
  if [ -n "$pid" ]; then
    echo "🛑 Port $port → occupé par PID $pid → kill"
    kill -9 $pid
  else
    echo "✅ Port $port → déjà libre"
  fi

done

# 💣 Tue tous les processus Node.js, MongoDB, Vite, etc.
echo "🔫 Suppression des processus de dev : node, vite, mongod, npm..."
for proc in node vite mongod npm next; do
  pkill -9 $proc 2>/dev/null && echo "❌ Processus $proc stoppé" || echo "✅ Aucun processus $proc actif"
done

echo "🚀 Nettoyage terminé. Tu peux redémarrer ton projet."
