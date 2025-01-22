import { Body, Controller, Get, Query, Post } from '@nestjs/common';
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

    @Post('isAuthenticated')
    isAuthenticated(@Body() body: CreateUserDto){
        return this.authService.isAuthenticated(body);
    }

    @Post('login')
    login(@Body() body: loginProps){
        return this.authService.login(body);
    }
}
