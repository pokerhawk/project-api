import { IsEnum, IsString } from "class-validator";

enum PriorityEnum {
    high = "high",
    medium = "medium",
    low = "low"
}

export class CreateTaskDto {
    
    @IsString()
    title: string;

    @IsString()
    description: string;
    
    @IsEnum(PriorityEnum)
    priority: PriorityEnum;

    @IsString()
    dueDate: string;
}