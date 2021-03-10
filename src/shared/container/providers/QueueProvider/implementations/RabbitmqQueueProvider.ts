import SendForgotPasswordEmailServiceConsumer from '@modules/users/services/SendForgotPasswordEmailServiceConsumer';
import AppError from '@shared/errors/AppError';
import { Connection, Channel, connect, Replies } from 'amqplib';
import { container } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';

import IQueueProvider from '../models/IQueueProvider';
import Message from '../dtos/IQueueDTOS';

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

  public async publishOnQueue(
    queue: string,
    message: Message,
  ): Promise<boolean> {
    this.channel.assertQueue(queue);
    return this.channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message)),
    );
  }

  public async mailConsumer(user: User): Promise<void> {
    const forgotPasswordControllerConsumer = container.resolve(
      SendForgotPasswordEmailServiceConsumer,
    );
    await forgotPasswordControllerConsumer.run(user);
  }

  public async consumeMailQueue(queue: string): Promise<Replies.Consume> {
    return this.channel.consume(queue, async message => {
      if (message === null) throw new AppError('invalide message content');
      await new Promise(resolve => setTimeout(resolve, 5000));
      const user = JSON.parse(message.content.toString());
      await this.mailConsumer(user);

      this.channel.ack(message);
    });
  }
}
