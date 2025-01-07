import { IsEnum, IsOptional, IsString } from "class-validator";

enum PriorityEnum {
    high = "high",
    medium = "medium",
    low = "low"
}

enum StatusEnum {
    pending = "pending",
    atWork = "atWork",
    completed = "completed"
}

export class UpdateTaskDto {

    @IsString()
    taskId: string;
    
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;
    
    @IsOptional()
    @IsEnum(PriorityEnum)
    priority?: PriorityEnum;

    @IsOptional()
    @IsEnum(StatusEnum)
    status?: StatusEnum;

    @IsOptional()
    @IsString()
    dueDate?: string;
}