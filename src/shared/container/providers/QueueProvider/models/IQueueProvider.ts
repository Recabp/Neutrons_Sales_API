import { Replies } from 'amqplib';
import Message from '../dtos/IQueueDTOS';

export default interface IQueueProvider {
  start(): Promise<void>;

  publishOnQueue(queue: string, message: Message): Promise<boolean>;

  consumeMailQueue(queue: string): Promise<Replies.Consume>;
}
