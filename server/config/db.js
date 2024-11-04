import mongoose from "mongoose";
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URL
        : process.env.MONGODB_LOCAL
    );
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

// module.exports = connectDB
export default connectDB;
