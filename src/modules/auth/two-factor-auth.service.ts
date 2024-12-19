import { Injectable } from '@nestjs/common';
import { User } from 'prisma/generated/client';
import { authenticator } from 'otplib';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class TwoFactorAuthService {
  constructor(
    private readonly prisma: ClientService
  ) {
    authenticator.options = {
      window: 1,
    };
  }
  
  public async generateTwoFactorAuthSecret(loggedUserEmail: string) {
    const user = await this.prisma.user.findFirst({
      where: { email: loggedUserEmail },
    });

    if (user?.mfaEnabled)
    return;

    const secret = authenticator.generateSecret();
    const otpAuth = authenticator.keyuri(user.email, "Projeto Delivery", secret);

    await this.prisma.user.update({
      where: {id: user.id},
      data: {
        mfaSecret: secret,
        mfaEnabled: true
      }
    });

    return otpAuth;
  }

  async verifyTwoFaCode(code: string, user: User) {
    return authenticator.verify({
      token: code,
      secret: user.mfaSecret,
    });
  }
}
