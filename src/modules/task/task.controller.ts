import { Body, Controller, Get, Post, UseGuards, Patch, Delete, Request, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PriorityEnum, StatusEnum } from 'prisma/generated/client';

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

    @Delete()
    softDelete(
        @Query('taskId') taskId: string
    ){
        return this.taskService.softDelete(taskId);
    }

    @Get('all')
    allTasks(
        @Request() req: any,
        @Query('status') status: StatusEnum,
        @Query('priority') priority: PriorityEnum,
        @Query('dueDate') dueDate: string,
        @Query('rows') rows: number,
        @Query('page') page: number,
    ){
        return this.taskService.allTasks(req.user.id, status, priority, dueDate, rows, page);
    }
}
