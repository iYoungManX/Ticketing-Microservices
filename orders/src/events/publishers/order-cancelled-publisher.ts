import { Publisher, OrderCancelledEvent, Subjects } from "@iyoungman/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
