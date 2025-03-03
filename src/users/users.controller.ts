import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUsertDto } from './dtos/update-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { LoginResponse, UserPayload } from './interfaces/users-login.interface';
import { ExpressRequestWithUser } from './interfaces/express-request-with-user.interface';
import { Public } from 'src/common/decorators/public.decorator';
import { IsMineGuard } from 'src/common/guards/is-mine.guard';

@Controller('users')
export class UsersController {
   
    constructor(private readonly usersService: UsersService){}

    @Public()
    @Post('register')
    async registerUser(@Body() CreateUserDto: CreateUserDto):Promise<User> {
        console.log(CreateUserDto)
        return this.usersService.registerUser(CreateUserDto)
    }


    @Public()
    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
      // call users service method to login user
      return this.usersService.loginUser(loginUserDto);
    }
  
    @Get('me')
    me(@Request() req: ExpressRequestWithUser): UserPayload {
      return req.user;
    }
  
    @Patch(':id')
    @UseGuards(IsMineGuard)
    async updateUser(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUsertDto,
    ): Promise<User> {
      // call users service method to update user
      return this.usersService.updateUser(+id, updateUserDto);
    }
  
    @Delete(':id')
    @UseGuards(IsMineGuard) 
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
      // call users service method to delete user
      return this.usersService.deleteUser(+id);
    }
}
