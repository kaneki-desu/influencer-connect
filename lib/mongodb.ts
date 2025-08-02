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
    globalThis.mongooseConn = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  return globalThis.mongooseConn;
};

export default connectDB;
