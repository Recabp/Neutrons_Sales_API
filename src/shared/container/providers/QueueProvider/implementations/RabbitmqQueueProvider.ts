import { Connection, Channel, connect } from "amqplib";



export default class RabbitmqQueueProvider {


  private connect: Connection;
  private channel: Channel;

  constructor(private url: string) {

  }

  async start(): Promise<void> {
    this.connect = await connect(this.url);
    this.channel = await this.connect.createChannel();

  }

  async publishOnQueue(queue: string, message: any) {
    return this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }


}



const server = new RabbitmqQueueProvider('amqp://localhost:5672');
server.start()





