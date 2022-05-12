import { Publisher, Subjects, TicketUpdatedEvent} from "@iyoungman/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
