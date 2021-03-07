import User from '@modules/users/infra/typeorm/entities/User';
import SendForgotPasswordEmailServiceConsumer from '@modules/users/services/SendForgotPasswordEmailServiceConsumer';
import { container } from 'tsyringe';

class QeueConsumer {
  public async mailConsumer(user: User): Promise<void> {
    const forgotPasswordControllerConsumer = container.resolve(
      SendForgotPasswordEmailServiceConsumer,
    );
    await forgotPasswordControllerConsumer.run(user);
  }
}

export default QeueConsumer;
