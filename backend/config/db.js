import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use local MongoDB if no MONGO_URI provided
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/futuristcards';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // MongoDB connected successfully
  } catch (error) {
    // MongoDB connection error
    // Running in mock mode without database
    // Don't exit process, continue without database
  }
};

export default connectDB;
