export enum OrderStatus {
  // When the order has been created but the ticket
  //is it trying to order has not been reserved
  Created = "created",
  // The ticket the oreder is trying to reserve has already
  // been reserved, or when the user has cancelled the order
  Cancelled = "cancelled",

  // the order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",

  // the order has reserved the ticket and the user has provided payment sucessfully
  Complete = "complete",
}
