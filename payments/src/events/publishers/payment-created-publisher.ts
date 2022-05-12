import { Subjects,Publisher,PaymentCreatedEvent } from "@iyoungman/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
  subject: Subjects.PaymentCreated=Subjects.PaymentCreated;
}