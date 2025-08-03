import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/influencer-connect';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Type declaration for globalThis
declare global {
  var mongooseConn: Promise<typeof mongoose> | undefined;
}

// Reuse connection across hot reloads

const connectDB = async (): Promise<typeof mongoose> => {
  if (!globalThis.mongooseConn) {
    console.log('Connecting to MongoDB...');
    globalThis.mongooseConn = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
      .then((mongooseInstance) => {
        console.log('MongoDB connected');
        return mongooseInstance;
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
  } else {
    console.log('Reusing existing MongoDB connection');
  }
  return globalThis.mongooseConn;
};

// Ensure models are registered
const registerModels = () => {
  try {
    // Import models to ensure they're registered
    require('@/models/Influencer');
    require('@/models/Campaign');
    console.log('Models registered successfully');
  } catch (error) {
    console.error('Error registering models:', error);
  }
};

export { registerModels };
export default connectDB;
