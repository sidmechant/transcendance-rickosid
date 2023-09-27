import { Module } from '@nestjs/common';
import { BallService } from './ball.service'; // Importez vos services ici
import {BorderService } from './border.service'
import { BotService}  from './bot.service'
import {PhysicService} from './physic.service'


@Module({
  providers: [BallService, BorderService, BotService, PhysicService], // Ajoutez tous vos services ici
  exports: [BallService, BorderService, BotService, PhysicService], // Si vous souhaitez les exporter pour une utilisation dans d'autres modules
})
export class PhysicModule {}
