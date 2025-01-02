import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [ClientModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
