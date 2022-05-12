import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subject";
import { TicketCreatedEvent } from "./ticket-created-events";



export class TicketCreatedListerner extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payment-service";
  
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log("Event data!", data);

    console.log(data.id)
    console.log(data.title)
    console.log(data.price)
    msg.ack();
  }
}
