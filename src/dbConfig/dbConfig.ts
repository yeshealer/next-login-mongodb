import mongoose from "mongoose";

// This connect function is used to connect to database.
// It will be called in all of the API routes files.

export default async function connect() {
  try {
    console.log("monogo URI", process.env.MONGO_URI!);
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        `MongoDB connection error. Make sure MongoDB is running ${err}`
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
