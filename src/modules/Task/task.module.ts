import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [ClientModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}
