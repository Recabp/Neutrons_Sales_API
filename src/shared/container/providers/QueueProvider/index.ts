import { container } from 'tsyringe';

import IQeueProvider from './models/IQueueProvider';
import RabbitmqQueueProvider from './implementations/RabbitmqQueueProvider';

container.registerSingleton<IQeueProvider>(
  'QueueProvider',
  RabbitmqQueueProvider,
);
