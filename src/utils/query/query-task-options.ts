import { PriorityEnum, StatusEnum } from "prisma/generated/client"
import { taskQueryProps } from "src/types/taskService"
import { skipOption } from "../pagination/pagination";
import { transformToDate } from "../date/adjust-date";

export const queryTaskOptions = (userId: string, status?: StatusEnum, priority?: PriorityEnum, dueDate?: string, rows?: number, page?: number) =>{
    let query: taskQueryProps = {
        where: {
            AND: [
                {userId},
            ]
        },
        orderBy: {
            createdAt: 'asc'
        }
    };
    let queryCount: taskQueryProps = {
        where: {
            AND: [
                {userId},
            ]
        },
        orderBy: {
            createdAt: 'asc'
        }
    };
    
    if(rows && page){
        query.take = rows;
        query.skip = skipOption(rows, page);
    }

    if(status){
        query.where.AND.push({status: status})
        queryCount.where.AND.push({status: status})
    }
    if(priority){
        query.where.AND.push({priority: priority})
        queryCount.where.AND.push({priority: priority})
    }
    if(dueDate){
        query.where.AND.push({dueDate: transformToDate(dueDate)})
        queryCount.where.AND.push({dueDate: transformToDate(dueDate)})
    }

    return {
        query, 
        queryCount
    };
}