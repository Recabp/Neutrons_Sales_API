import AppError from '@shared/errors/AppError';
import { Connection, Channel, connect, Message } from 'amqplib';
import IQeueProvider from '../models/IQueueProvider';

export default class RabbitmqQueueProvider implements IQeueProvider {
  private connect: Connection;

  private channel: Channel;

  constructor(private url: string) {}

  async start(): Promise<void> {
    this.connect = await connect(this.url);
    this.channel = await this.connect.createChannel();
  }

  async publishOnQueue(queue: string, message: any) {
    return this.channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message)),
    );
  }

  async consumeQueue(queue: string, callback: (massage: Message) => void) {
    return this.channel.consume(queue, message => {
      if (message === null) throw new AppError('invalide message content');

      callback(message);
      this.channel.ack(message);
    });
  }
}

const server = new RabbitmqQueueProvider('amqp://localhost:5672');
server.start();
