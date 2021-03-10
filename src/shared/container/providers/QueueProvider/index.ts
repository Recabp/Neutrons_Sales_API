import { container } from 'tsyringe';

import IQueueProvider from './models/IQueueProvider';
import RabbitmqQueueProvider from './implementations/RabbitmqQueueProvider';
import IQueueConsumer from './models/IQueueConsumer';
import QeueConsumer from './implementations/QueueConsumer';

container.registerInstance<IQueueProvider>(
  'QueueProvider',
  container.resolve(RabbitmqQueueProvider),
);

container.registerSingleton<IQueueConsumer>('QueueConsumer', QeueConsumer);
