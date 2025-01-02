import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService, loginProps } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { WeatherService } from 'src/services/weather-api/weather.service';
import { ApiKeyAuthGuard } from './guards/apikey-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly weatherService: WeatherService
    ){}

    @Post('register')
    registerUser(@Body() userPayload: CreateUserDto){
        return this.authService.register(userPayload);
    }

    @Get('isAuthenticated')
    isAuthenticated(@Param() email: string){
        return this.authService.isAuthenticated(email);
    }

    @Post('login')
    login(@Body() body: loginProps){
        return this.authService.login(body);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Get('manualGenerateQrCode')
    generate2FA(@Param() userId: string){
        return this.authService.manualGenerate2FA(userId);
    }

    @UseGuards(ApiKeyAuthGuard)
    @Post('manualVerify2Fa')
    verify2FA(@Body() body: loginProps){
        return this.authService.manualVerify2FA(body);
    }
}