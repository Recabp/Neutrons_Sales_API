import User from '@modules/users/infra/typeorm/entities/User';
import { Replies } from 'amqplib';

export default interface IQueueProvider {
  start(): Promise<void>;

  publishOnQueue(queue: string, message: User): Promise<boolean>;

  consumeMailQueue(queue: string): Promise<void>;
}
