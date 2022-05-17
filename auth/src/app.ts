import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/sginout";
import { errorHandler,NotFoundError  } from "@iyoungman/common";
const app = express();
// ?????
app.set("trust proxy", true);
// parse the req by json
app.use(json());
// parse the cookie and session
app.use(
  cookieSession({
    // if the cookie is signed?
    signed: false,
<<<<<<< HEAD
    // do we only accept https?
=======
>>>>>>> 56f327e704d7f6cb12672adbd7ead0039c95f8c4
    secure: false,
  })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};
