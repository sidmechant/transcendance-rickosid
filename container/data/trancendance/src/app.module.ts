import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module'
import { UsersModule } from './users/users.module';
import { PlayersModule } from './players/players.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, PlayersModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
