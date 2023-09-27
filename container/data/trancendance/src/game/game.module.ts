import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { PhysicModule } from './physic/physic.module';


@Module({
  controllers: [GameController],
  providers: [GameService],
  imports: [PhysicModule]
})
export class GameModule {}
