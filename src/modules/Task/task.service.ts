import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { transformToDate } from 'src/utils/date/adjust-date';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        private readonly prisma: ClientService,
    ){}

    async create(userId, taskPayload: CreateTaskDto){
        return await this.prisma.task.create({
            data:{
                title: taskPayload.title,
                description: taskPayload.description,
                priority: taskPayload.priority,
                dueDate: transformToDate(taskPayload.dueDate, 'gte'),
                userId
            }
        })
    }

    async update(taskPayload: UpdateTaskDto){

        const task = await this.prisma.task.findUnique({where:{id: taskPayload.taskId}})

        return await this.prisma.task.update({
            where: {id: taskPayload.taskId},
            data: {
                title: taskPayload.title? taskPayload.title: task.title,
                description: taskPayload.description? taskPayload.description: task.description,
                priority: taskPayload.priority? taskPayload.priority: task.priority,
                status: taskPayload.status? taskPayload.status: task.status,
                dueDate: taskPayload.dueDate? transformToDate(taskPayload.dueDate, 'gte'): task.dueDate
            }
        })
    }
}