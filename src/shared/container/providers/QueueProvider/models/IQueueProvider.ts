import { Message, Replies } from 'amqplib';

export default interface IQueueProvider {
  start(): Promise<void>;

  publishOnQueue(queue: string, message: any): Promise<boolean>;

  consumeMailQueue(queue: string): Promise<Replies.Consume>;
}
