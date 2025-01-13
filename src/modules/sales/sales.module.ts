import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

@Module({
  imports: [ClientModule],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService]
})
export class SalesModule {}
