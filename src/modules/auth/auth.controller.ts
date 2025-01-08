import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService, loginProps } from './auth.service';
import { CreateUserDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
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
}