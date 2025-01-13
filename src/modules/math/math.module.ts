import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { MathService } from './math.service';
import { MathController } from './math.controller';

@Module({
  imports: [ClientModule],
  controllers: [MathController],
  providers: [MathService],
  exports: [MathService]
})
export class MathModule {}
