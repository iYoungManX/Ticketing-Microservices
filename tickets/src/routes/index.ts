import express, { Request, Response } from "express";

import { Ticket } from "../models/ticket";


const router =express.Router();

router.get('/api/tickets/',async (req:Request, res:Response) => {
  // orderId: undefined shows only the ticket has not been booked
  const ticket =await Ticket.find({
    orderId: undefined,
  });
  res.send(ticket);
})

export {router as indexTicketRouter}