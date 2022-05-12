import { Publisher, Subjects, TicketCreatedEvent } from "@iyoungman/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject:Subjects.TicketCreated = Subjects.TicketCreated;
}

//new TicketCreatedPublisher(client)
