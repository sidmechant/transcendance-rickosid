import { Controller, Get, Param, Req, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import {JwtAuthGuard} from 'src/auth/jwt.guard';
import { Request } from 'express'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 // @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUSer(@Param() params: {id: number}, req: Request){
    return this.usersService.getMyUsers(params.id, req)
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers()
  }
}
