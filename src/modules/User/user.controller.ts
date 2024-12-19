import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { dateProps } from 'src/utils/date/adjust-date';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    
    @Get('getUserById')
    getUserById(
        @Query('userId') userId: string
    ){
        return this.userService.getUserById(userId);
    }

    // @Get('getAll')
    // getUsers(
    //     @Query('rows', ParseIntPipe) rows: number,
    //     @Query('page', ParseIntPipe) page: number,
    //     @Query('businessId') businessId: string
    // ){
    //     return this.userService.getUsers(rows, page, businessId);
    // }

    // @Get('sellersList')
    // sellersList(
    //     @Query('rows', ParseIntPipe) rows: number,
    //     @Query('page', ParseIntPipe) page: number,
    //     @Query('page', ParseIntPipe) type: dateProps
    // ){
    //     return this.userService.sellersList(rows, page, type);
    // }

    // @Patch('updateUserCommission')
    // updateUserCommission(
    //     @Query('id') id: string, 
    //     @Query('commission') commission: number){
    //     return this.userService.updateUserCommission(id, commission);
    // }
}