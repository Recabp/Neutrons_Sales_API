import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('QueueProvider')
    private queueProvider: IQueueProvider,
  ) {}

  public async run({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists');
    }

    await this.queueProvider.publishOnQueue('MailQueue', user);
  }
}

export default SendForgotPasswordEmailService;
