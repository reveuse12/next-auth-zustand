import mongoose from "mongoose";

let cachedDb = null;

const connectDB = async () => {
  // Validate environment variables
  if (!process.env.MONGO_URI || !process.env.DB_NAME) {
    throw new Error("Please define the environment variables in .env.local");
  }

  // If we have a connection already, return it
  if (cachedDb) {
    console.log("Using existing database connection");
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
      autoCreate: true,
    });

    console.log("Database Connected");
    // Cache the database connection object
    cachedDb = db;
    return db;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

// For development mode to prevent hot-reload issues
if (process.env.NODE_ENV === "development") {
  if (!global._mongooseConnection) {
    global._mongooseConnection = connectDB();
  }
  cachedDb = global._mongooseConnection;
}

export default connectDB;
