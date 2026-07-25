import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`);
    console.log("DB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

export default ConnectDb;