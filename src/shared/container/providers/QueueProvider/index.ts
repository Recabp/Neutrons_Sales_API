import { container } from 'tsyringe';

import IQueueProvider from './models/IQueueProvider';
import RabbitmqQueueProvider from './implementations/RabbitmqQueueProvider';

container.registerSingleton<IQueueProvider>(
  'QueueProvider',
  RabbitmqQueueProvider,
);
