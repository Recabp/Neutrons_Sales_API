import { inject, injectable } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import IUserTokensRepository from '../repositories/IUserTokensRepository';
import User from '../infra/typeorm/entities/User';

@injectable()
class SendForgotPasswordEmailServiceConsumer {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async run(user: User): Promise<void> {
    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Neutrons] Password Recovery',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailServiceConsumer;
