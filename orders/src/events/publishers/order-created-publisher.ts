import { Publisher, OrderCreatedEvent, Subjects } from "@iyoungman/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
