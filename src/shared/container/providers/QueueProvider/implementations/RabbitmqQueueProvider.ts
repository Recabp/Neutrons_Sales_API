import AppError from '@shared/errors/AppError';
import { Connection, Channel, connect, Replies } from 'amqplib';
import User from '@modules/users/infra/typeorm/entities/User';

import IQueueProvider from '../models/IQueueProvider';
import Consumer from './ConsumeQueue';

export default class RabbitmqQueueProvider implements IQueueProvider {
  private connect: Connection;

  private channel: Channel;

  constructor() {
    this.start().then(() => {
      console.log('rabbitmq has been conected');
      this.channel.prefetch(1, true);
      this.consumeMailQueue('MailQueue').then(() =>
        console.log('Consumer has been started'),
      );
    });
  }

  public async start(): Promise<void> {
    this.connect = await connect('amqp://localhost:5672');
    this.channel = await this.connect.createChannel();
  }

  public async publishOnQueue(queue: string, message: User): Promise<boolean> {
    this.channel.assertQueue(queue);
    return this.channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message)),
    );
  }

  public async consumeMailQueue(queue: string): Promise<void> {
    this.channel.consume(queue, async message => {
      if (message === null) throw new AppError('invalide message content');
      await new Promise(resolve => setTimeout(resolve, 5000));
      const msg = JSON.parse(message.content.toString());
      await Consumer.mailConsumer(msg);

      this.channel.ack(message);
    });
  }
}
