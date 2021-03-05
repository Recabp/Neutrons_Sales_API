import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
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
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('QueueProvider')
    private queueProvider: IQueueProvider,
  ) {}

  public async run({ email }: IRequest): Promise<void> {
    // const user = await this.usersRepository.findByEmail(email);
    // if (!user) {
    //   throw new AppError('User does not exists');
    // }

    // const { token } = await this.userTokensRepository.generate(user.id);

    // const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs',)

    // await this.mailProvider.sendMail({
    //   to: {
    //     name: user.name,
    //     email: user.email,
    //   },
    //   subject: '[Neutrons] Password Recovery',
    //   templateData: {
    //     file: forgotPasswordTemplate,
    //     variables: {
    //       name: user.name,
    //       link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
    //     }
    //   }
    // });

    const bab = '4';

    await this.queueProvider.publishOnQueue('queue', bab);
  }
}

export default SendForgotPasswordEmailService;
