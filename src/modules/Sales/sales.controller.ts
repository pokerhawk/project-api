import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards, Patch, Delete } from '@nestjs/common';
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
    create(@Body() salePayload: CreateSalesDto){
        return this.salesService.create(salePayload);
    }

    @Get()
    userSales(
        @Query('rows', ParseIntPipe) rows: number,
        @Query('page', ParseIntPipe) page: number,
        @Query('id') id: string
    ){
        return this.salesService.userSales(rows, page, id);
    }

    @Patch()
    updateSaleStatus(@Body() updateStatusPayload: UpdateSaleDto){
        return this.salesService.updateSaleStatus(updateStatusPayload);
    }
}