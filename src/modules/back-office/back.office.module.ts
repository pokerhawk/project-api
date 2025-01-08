import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { BackOfficeService } from './back.office.service';
import { BackOfficeController } from './back.office.controller';
import { TwoFactorAuthService } from '../auth/two-factor-auth.service';

@Module({
  imports: [ClientModule],
  controllers: [BackOfficeController],
  providers: [BackOfficeService, TwoFactorAuthService],
  exports: [BackOfficeService]
})

export class BackOfficeModule {}