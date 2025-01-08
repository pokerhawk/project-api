import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: ClientService,
    ){}

    async getUserById(userId:string){
        const user = await this.prisma.user.findUnique({where: {id: userId}});
        return {...user};
    }

    async getUsers(loggedUserId:string, rows: number, page: number){
        const { accountAccess } = await this.prisma.user.findUnique({where:{id: loggedUserId}})

        if(accountAccess === 'admin' || accountAccess === 'support'){
            return await this.prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take: rows,
                skip: (page-1)*rows,
            });
        }
    }

    async softDelete(userId: string){
        const user = await this.prisma.user.findFirst({where: {id: userId}});
        return await this.prisma.user.update({
            where: {id: user.id},
            data: {
                deletedAt: new Date()
            }
        });
    }
}