import { Injectable } from '@nestjs/common';
import { Box, Body } from 'p2-es';
import { BALL, BORDER, PADDLE, MAP_HEIGHT, MAP_WIDTH, OFFSET } from './constante';
import { Location } from '../types/physics';

@Injectable()
export class BorderService {
  createBorder(location: Location): Body {
    const shape: Box = new Box({ width: MAP_WIDTH * 2, height: OFFSET * 2 });
    shape.collisionGroup = BORDER;
    shape.collisionMask = BALL | PADDLE;

    const body: Body = new Body({ mass: 0, position: [0, (MAP_HEIGHT / 2 + OFFSET) * location] });
    body.addShape(shape);

    return body;
  }
}
