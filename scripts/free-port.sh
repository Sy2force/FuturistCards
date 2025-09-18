#!/bin/bash
echo "🧹 Libération des ports..."
lsof -ti:3001,3002,3003,3004,3005,5001,5002,5003,5004,5005 | xargs kill -9 2>/dev/null || true
echo "✅ Ports libérés"
