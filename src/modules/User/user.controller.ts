import { Controller, Delete, Get, Param, Request, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    
    @Get('byId')
    getUserById(
        @Query('userId') userId: string
    ){
        return this.userService.getUserById(userId);
    }

    @Get('all')
    getUsers(
        @Request() req: any,
        @Param('rows') rows: number,
        @Param('page') page: number
    ){
        return this.userService.getUsers(req.user.id, rows, page);
    }

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

    @Delete()
    softDelete(
        @Param() userId: string
    ){
        return this.userService.softDelete(userId);
    }
}