import AppError from '@shared/errors/AppError';
import { Connection, Channel, connect, Message } from 'amqplib';
import IQueueProvider from '../models/IQueueProvider';

export default class RabbitmqQueueProvider implements IQueueProvider {
  private connect: Connection;

  private channel: Channel;

  constructor() {
    this.start().then(() => console.log('rabbitmq has been conected'));
  }

  public async start(): Promise<void> {
    this.connect = await connect('amqp://localhost:5672');
    this.channel = await this.connect.createChannel();
  }

  public async publishOnQueue(queue: string, message: any) {
    this.channel.assertQueue(queue);
    return this.channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message)),
    );
  }

  public async consumeQueue(
    queue: string,
    callback: (massage: Message) => void,
  ) {
    return this.channel.consume(queue, message => {
      if (message === null) throw new AppError('invalide message content');

      callback(message);
      this.channel.ack(message);
    });
  }
}
