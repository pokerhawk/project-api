import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('externalApi')
export class ExternalApiController {
    constructor(
        private readonly externalApiService: ExternalApiService
    ){}
    
    @Get('getWeatherByCity')
    getUserById(
        @Query('city') city: string
    ){
        return this.externalApiService.weatherApi(city);
    }
}