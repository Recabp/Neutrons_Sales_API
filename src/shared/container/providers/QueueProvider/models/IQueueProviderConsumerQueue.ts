import User from '@modules/users/infra/typeorm/entities/User';

export default interface IQueueProviderConsumerQueue {
  mailConsumer(user: User): Promise<void>;
}
