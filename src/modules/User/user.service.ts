import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { fixedDate, dateProps } from 'src/utils/date/adjust-date';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: ClientService,
    ){}

    async getUserById(userId:string){
        const user = await this.prisma.user.findUnique({where: {id: userId}});
        return {...user};
    }

    async getUsers(rows: number, page: number, businessId: string){}

    async delete(userId: string){
        const user = await this.prisma.user.findFirst({where: {id: userId}});
        return await this.prisma.user.delete({where: {id: user.id}});
    }
}