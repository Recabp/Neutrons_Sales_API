import { container } from 'tsyringe'

import EtherealMailProvider from './implementations/EtherealMailProvider';


import IMailProvider from '../MailProvider/models/IMailProvider';





container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider));
