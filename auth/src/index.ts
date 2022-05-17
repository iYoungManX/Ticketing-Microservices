import mongoose, { ConnectOptions } from "mongoose";
import { app } from "./app";
const start = async () => {
 // check if JWT_KEY exist
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
 // check if MONGO_URI exist
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // remove the warning because of depreciate
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to mongoDB");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on 3000 !!!");
  });
};

start();
