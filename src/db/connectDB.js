import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
      autoCreate: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log("error connecting to Database", error);
  }
};

export default connectDB;
