export default interface IQeueProvider {
  start(): Promise<void>;

  publishOnQueue(queue: string, message: any): Promise<any>;

  consumeQueue(queue: string, callback: any): Promise<any>;
}
