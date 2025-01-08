import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { TwoFactorAuthService } from '../auth/two-factor-auth.service';
import { loginProps } from '../auth/auth.service';
import { UpdateUserAccessDto } from './dto/update-user-access.dto';

@Injectable()
export class BackOfficeService {
    constructor(
        private readonly prisma: ClientService,
        private readonly twoFactorService: TwoFactorAuthService,
    ){}

    async getLoggedUser(loggedUser: string){
        const { accountAccess, id } = await this.prisma.user.findFirst({where:{id: loggedUser}})
        return {accountAccess, id};
    }

    async updateUserAccountAccess(loggedUser: string, body: UpdateUserAccessDto){
        const { accountAccess, id } = await this.getLoggedUser(loggedUser);
        console.log(accountAccess, id)
        if(accountAccess === 'admin' || id === '6a2b92d8-bba6-4ad8-b97e-764ba3776fba'){
            console.log("if true")
            return await this.prisma.user.update({
                where:{id: body.userId},
                data:{
                    accountAccess: body.accountAccess
                }
            })
        }
        return {
            message: "No permission"
        };
    }

    async deleteTask(loggedUser: string, taskId: string){
        const { accountAccess } = await this.getLoggedUser(loggedUser);

        if(accountAccess === 'admin' || accountAccess === 'support'){
            return await this.prisma.task.delete({
                where:{id: taskId}
            })
        }
        return {
            message: "No permission"
        };
    }

    async manualGenerate2FA(loggedUser: string, userId: string){
        const { accountAccess } = await this.getLoggedUser(loggedUser);
        if(accountAccess === 'admin' || accountAccess === 'support'){
            const user = await this.prisma.user.findFirst({where:{id: userId}});
            if(user.mfaEnabled)
                return;
    
            const qrcode = await this.twoFactorService.generateTwoFactorAuthSecret(user.email);
    
            return {qrcode};
        }
        return {
            message: "No permission"
        };
    }

    async manualVerify2FA(loggedUser: string, body: loginProps){
        const { accountAccess } = await this.getLoggedUser(loggedUser);
        if(accountAccess === 'admin' || accountAccess === 'support'){
            const user = await this.prisma.user.findFirst({where:{id: body.userId}})
            const isCodeValid = await this.twoFactorService.verifyTwoFaCode(body.code, user);
    
            return isCodeValid;
        }
        return {
            message: "No permission"
        };
    }
}