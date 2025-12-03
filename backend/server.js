require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['*'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Mock data for cards
const mockCards = [
  { id: 1, name: "John Doe", title: "Developer", company: "Tech Corp", email: "john@techcorp.com" },
  { id: 2, name: "Jane Smith", title: "Designer", company: "Design Studio", email: "jane@design.com" },
  { id: 3, name: "Bob Wilson", title: "Manager", company: "Business Inc", email: "bob@business.com" }
];

app.get("/api/health", (req, res) => {
  const mongoConnected = mongoose.connection.readyState === 1;
  res.json({ 
    success: true, 
    message: "Server is healthy",
    mongodb: mongoConnected ? "connected" : "fallback mode",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/cards", (req, res) => {
  res.json({ 
    success: true, 
    data: mockCards,
    message: "Cards retrieved successfully (mock data)"
  });
});

app.post("/api/auth/login", (req, res) => {
  res.json({ 
    success: true, 
    message: "Login successful (mock)",
    token: "mock-jwt-token"
  });
});

app.post("/api/auth/register", (req, res) => {
  res.json({ 
    success: true, 
    message: "Registration successful (mock)"
  });
});

async function startServer() {
  // Try to connect to MongoDB, but don't fail if it doesn't work
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.warn("⚠️ MongoDB connection failed, running in fallback mode:", err.message);
    }
  } else {
    console.log("⚠️ No MONGO_URI provided, running in fallback mode");
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📊 Cards endpoint: http://localhost:${PORT}/api/cards`);
  });
}

startServer();
