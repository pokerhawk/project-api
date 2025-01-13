import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MathService } from './math.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('math')
export class MathController {
    constructor(
        private readonly mathService: MathService
    ){}
    
    @Get('solarDeclination')
    solarDeclination(){
        return this.mathService.solarDeclination();
    }
}
