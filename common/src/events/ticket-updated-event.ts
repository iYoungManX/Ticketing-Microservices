import { Subjects } from "./subjects";

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;

  data: {
    id: string;
    // this is the update
    version: number;
    title: string;
    price: number;
    userId: string;
    // orderId assign to a certian ticket
    orderId?:string;
  };
}
