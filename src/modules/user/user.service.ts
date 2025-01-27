import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'prisma/generated/client';
import { ClientService } from 'src/client/client.service';
import { skipOption } from 'src/utils/pagination/pagination';
import * as bcrypt from 'bcrypt'
import { transformToDate } from 'src/utils/date/adjust-date';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: ClientService,
    ){}

    async getUserById(loggedUserId: string, userId:string){
        const { password, ...loggedUser } = await this.prisma.user.findUnique({where: {id: loggedUserId}});
        if(loggedUser.accountAccess != 'user'){
            const { password, ...user } = await this.prisma.user.findUnique({where: {id: userId}});
            return user;
        }
        return loggedUser;
    }

    async getUsers(loggedUserId:string, rows: number, page: number){
        const { accountAccess } = await this.prisma.user.findUnique({where:{id: loggedUserId}})
        if(accountAccess === 'admin' || accountAccess === 'support'){
            return await this.prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                take: rows,
                skip: skipOption(rows, page),
            });
        }
    }

    async updateUser(loggedUserId: string, body: Partial<User>){
        const user = await this.prisma.user.findUnique({where:{id: loggedUserId}});
        const update = await this.prisma.user.update({
            where:{id: loggedUserId},
            data: {
                name: body.name? body.name: user.name,
                email: body.email? body.email: user.email,
                password: body.password? bcrypt.hashSync(body.password, 10) : user.password,
                phone: body.phone? body.phone : user.phone,
                zipcode: body.zipcode? body.zipcode : user.zipcode,
                address: body.address? body.address : user.address,
                number: body.number? body.number : user.number,
                neighborhood: body.neighborhood? body.neighborhood : user.neighborhood,
                state: body.state? body.state : user.state,
                city: body.city? body.city : user.city,
                complement: body.complement? body.complement : user.complement,
                birthDate: body.birthDate? transformToDate(body.birthDate.toString()) : user.birthDate,
            }
        })

        if(update){
            return {
                statusCode: HttpStatus.OK,
                message: "Atualizado com sucesso"
            }
        }
        throw new HttpException('Algo deu errado', HttpStatus.BAD_REQUEST);
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
