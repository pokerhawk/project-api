import { Controller, Delete, Get, Param, Request, Query, UseGuards, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { User } from 'prisma/generated/client';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    
    @Get('byId')
    getUserById(
        @Request() req: any,
        @Query('userId') userId: string
    ){
        return this.userService.getUserById(req.user.id, userId);
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
    
    @Post('update')
    updateUser(
        @Request() req: any,
        @Body() body: Partial<User>
    ){
        return this.userService.updateUser(req.user.id, body);
    }

    @Delete()
    softDelete(
        @Param() userId: string
    ){
        return this.userService.softDelete(userId);
    }
}
