import { Body, Controller, Get, ParseIntPipe, Post, Query, UseGuards, Patch, Request } from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateSalesDto } from './dto/create-sales.dto';
import { UpdateSaleDto } from './dto/update-sale-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SalesController {
    constructor(
        private readonly salesService: SalesService
    ){}

    @Post()
    create(
        @Request() req: any,
        @Body() salePayload: CreateSalesDto
    ){
        return this.salesService.create(req.user.id, salePayload);
    }

    @Get()
    userSales(
        @Request() req: any,
        @Query('rows', ParseIntPipe) rows: number,
        @Query('page', ParseIntPipe) page: number,
    ){
        return this.salesService.userSales(rows, page, req.user.id);
    }

    @Patch()
    updateSaleStatus(@Body() updateStatusPayload: UpdateSaleDto){
        return this.salesService.updateSaleStatus(updateStatusPayload);
    }
}
