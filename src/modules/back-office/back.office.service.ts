import { Injectable, UnauthorizedException } from '@nestjs/common';
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
        const { accountAccess, email } = await this.prisma.user.findFirst({where:{id: loggedUser}})
        return {accountAccess, email};
    }

    async updateUserAccountAccess(loggedUser: string, body: UpdateUserAccessDto){
        const { accountAccess, email } = await this.getLoggedUser(loggedUser);
        if(accountAccess === 'admin' || email === 'eliabedosreis@gmail.com'){
            return await this.prisma.user.update({
                where:{id: body.userId},
                data:{
                    accountAccess: body.accountAccess
                }
            })
        }
        throw new UnauthorizedException('No permission')
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
            const user = await this.prisma.user.findUnique({where:{email: body.email}})
            const isCodeValid = await this.twoFactorService.verifyTwoFaCode(body.code, user);
    
            return isCodeValid;
        }
        return {
            message: "No permission"
        };
    }

    async manualGenerate2FaCode(email: string){
        const user = await this.prisma.user.findUnique({where:{email}})
        const { accountAccess } = await this.getLoggedUser(user.id);
        if(accountAccess === 'admin' || email === 'eliabedosreis@gmail.com')
            return await this.twoFactorService.generate2FaCode(email);
        throw new UnauthorizedException('No permission')
    }
}
