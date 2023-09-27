import { HttpModule } from "@nestjs/axios";
import { Module } from '@nestjs/common';
import { FortyTwoApiService } from './forty-twoapi.service';
import { FortyTwoApiController } from './forty-twoapi.controller';
import { CrudService } from './crud.service'
import {JwtModule } from '@nestjs/jwt'

@Module({
  imports: [HttpModule, JwtModule],
  providers: [FortyTwoApiService, CrudService],
  controllers: [FortyTwoApiController]
})
export class FortyTwoapiModule {}
