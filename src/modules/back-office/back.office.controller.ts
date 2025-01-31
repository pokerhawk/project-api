import { Body, Controller, Get, Param, Post, UseGuards, Patch, Delete, Request, Query } from '@nestjs/common';
import { BackOfficeService } from './back.office.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { loginProps } from '../auth/auth.service';
import { UpdateUserAccessDto } from './dto/update-user-access.dto';

@UseGuards(JwtAuthGuard)
@Controller('back-office')
export class BackOfficeController {
    constructor(
        private readonly backOfficeService: BackOfficeService
    ){}

    @Patch('updateUserAccess')
    updateUserAccountAccess(
        @Request() req: any,
        @Body() body: UpdateUserAccessDto
    ){
        return this.backOfficeService.updateUserAccountAccess(req.user.id, body);
    }

    @Delete('deleteTask')
    deleteTask(
        @Request() req: any,
        @Query('taskId') taskId: string
    ){
        return this.backOfficeService.deleteTask(req.user.id, taskId);
    }

    @Get('manualGenerateQrCode')
    generate2FA(
        @Request() req: any,
        @Param() userId: string
    ){
        return this.backOfficeService.manualGenerate2FA(req.user.id, userId);
    }

    @Post('manualVerify2Fa')
    verify2FA(
        @Request() req: any,
        @Body() body: loginProps
    ){
        return this.backOfficeService.manualVerify2FA(req.user.id, body);
    }

    @Get('manual2FaCode')
    manual2FaCode(
        @Query('email') email: string
    ){
        return this.backOfficeService.manualGenerate2FaCode(email);
    }
}
