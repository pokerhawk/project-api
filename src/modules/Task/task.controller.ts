import { Body, Controller, Get, Param, Post, UseGuards, Patch, Delete, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ){}

    @Post()
    create(
        @Request() req: any,
        @Body() taskPayload: CreateTaskDto,
    ){
        return this.taskService.create(req.user.id, taskPayload);
    }

    @Patch()
    update(
        @Body() taskPayload: UpdateTaskDto,
    ){
        return this.taskService.update(taskPayload);
    }
}