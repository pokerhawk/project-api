import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { UserService } from './User/user.service';
import { UserController } from './User/user.controller';
import { SalesService } from './Sales/sales.service';
import { SalesController } from './Sales/sales.controller';

@Module({
  imports: [ClientModule],
  controllers: [UserController, SalesController],
  providers: [UserService, SalesService],
  exports: [UserService, SalesService]
})
export class AllModule {}
