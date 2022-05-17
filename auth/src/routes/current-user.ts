import express from "express";
import { currentUser } from "@iyoungman/common";

const router = express.Router();

//currentUser check is jwt is correct and add the payload into req
router.get("/api/users/currentuser", currentUser,(req, res) => {
   // so we can get currentUser here
  res.send({currentUser: req.currentUser|| null});

});

export { router as currentUserRouter };
