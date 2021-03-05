import { Connection, Channel, connect, Message } from 'amqplib';

export default interface IQueueProvider {
  start(): Promise<void>;

  publishOnQueue(queue: string, message: any): Promise<any>;

  consumeQueue(queue: string, callback: any): Promise<any>;
}
