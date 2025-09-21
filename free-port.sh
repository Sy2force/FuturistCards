#!/bin/bash
PORT=${1:-3000}
echo "🧼 Libération du port $PORT..."
PID=$(lsof -ti:$PORT)
if [ -n "$PID" ]; then
  kill -9 $PID
  echo "✅ Port $PORT libéré (PID $PID)"
else
  echo "ℹ️ Port $PORT déjà libre"
fi
