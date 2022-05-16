import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { errorHandler, NotFoundError, currentUser } from "@iyoungman/common";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
