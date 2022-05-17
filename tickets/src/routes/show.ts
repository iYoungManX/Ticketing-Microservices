import { NotFoundError } from "@iyoungman/common";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router =express.Router();

router.get('/api/tickets/:id',async (req:Request, res:Response) => {
  // because we use app.use(json()) so we can get id from req.params.id
  const ticket =await Ticket.findById(req.params.id);
  if(!ticket){
    throw new NotFoundError();
  }
  res.send(ticket);
})

export {router as showTicketRouter}