import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";
import { app } from "../app";
import jwt from "jsonwebtoken";

// declare global {
//   namespace NODEJS {
//     interface Global {
//       signin(): string[]
//     }
//   }
// }

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  //await mongo.stop();
  await mongoose.connection.close();
});

// global.signin =() => {
//   // Build a JWT payload {id, email}
//   const payload = {
//     id: "da21312kjg",
//     emial: "test@test.com",
//   };
//   //Create the JWT
//   const token = jwt.sign(payload, process.env.JWT_KEY!);
//   // Build session Object
//   const session = { jwt: token };
//   //Turn that session into JSON
//   const sessionJSON = JSON.stringify(session);
//   // take JSON and encode it as base64
//   const base64 = Buffer.from(sessionJSON).toString("base64");
//   // return a string
//   return `session=${base64}`;
// };
