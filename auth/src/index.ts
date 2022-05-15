import mongoose, { ConnectOptions } from "mongoose";
import { app } from "./app";
const start = async () => {
  console.log('Starting up ....!!!!')
  if (!process.env.JWT_KEY) {
    console.log("starting up....");
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
