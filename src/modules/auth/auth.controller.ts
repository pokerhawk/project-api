import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService, ILoginBody, Iverify2Fa } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
// import { ApiKeyAuthGuard } from './guards/apikey-auth.guard';

// @UseGuards(ApiKeyAuthGuard)
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    registerUser(@Body() userPayload: CreateUserDto){
        return this.authService.register(userPayload);
    }

    @Post('login')
    login(@Body() body: ILoginBody){
        return this.authService.login(body);
    }

    @Get('generateQrCode')
    generate2FA(@Param() userId: string){
        return this.authService.generate2FA(userId);
    }

    @Post('verify2Fa')
    verify2FA(@Body() body: Iverify2Fa){
        return this.authService.verify2FA(body);
    }
}