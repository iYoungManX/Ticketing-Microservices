import {Message, Stan} from 'node-nats-streaming'
import {Subjects} from './subjects'
interface Event{
  subject: Subjects,
  data: any;
}

export abstract class Listener<T extends Event> {
  // Name of the channel this listener is going to listen to
  abstract subject: T['subject'];
  // Name of the queue group this listener will join
  abstract queueGroupName: string;
  // Function to run when a message is received
  abstract onMessage(data: T['data'], msg: Message): void;
  // Pre-initilized NATS client
  protected client: Stan;
  // Number of seconds this listener has to ack a message
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }
  // Default subsciption options
  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subsciption = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subsciption.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} /${this.queueGroupName}`);

      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data == "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}


