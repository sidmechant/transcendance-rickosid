import { Injectable } from '@nestjs/common'
import { Body, Circle } from "p2-es";
import { BALL, BALL_RADIUS, BALL_SPEED, BORDER, FPS, PADDLE, PADDLE_POSITION } from "./constante";
import { Ball, Location } from "../types/physics";


@Injectable()
export class BallService {
  createBall(): Ball {
	const shape: Circle = new Circle({ radius: BALL_RADIUS });
	shape.collisionGroup = BALL;
	shape.collisionMask = PADDLE | BORDER;

	const ball: Ball = {
		body: new Body({ mass: 1, position: [0, 0] }),
		counter: 3,
		isStart: false,
		score: 0,
		speed: [0, 0],
		speedFactor: 2,
		start: (emit: (eventName: string | symbol, ...args: any[]) => boolean): void => {
			const direction: Location = (ball.score) ? ball.score : (Math.random() - 0.5 < 0) ? -1 : 1;
			ball.score = 0;
			// setTimeout(() => {
			// 	ball.speed = [1 * direction, 0];
			// }, 3000);
			const interval = setInterval(() => {
				emit('counter', ball.counter--);
				if (ball.counter < 0) {
					clearInterval(interval);
					ball.speed = [1 * direction, 0];
				}
			}, 1000);
			ball.isStart = true;
		},
		step: (delta: number): void => {
			ball.body.velocity[0] = BALL_SPEED * ball.speed[0] * ball.speedFactor * delta;
			ball.body.velocity[1] = BALL_SPEED * ball.speed[1] * ball.speedFactor * delta;
			if (ball.body.position[0] < -PADDLE_POSITION - 2 || ball.body.position[0] > PADDLE_POSITION + 2)
				ball.score = (Math.sign(ball.body.position[0]) < 0) ? -1 : 1;
		},
		reset: () => {
			ball.body.position[0] = 0;
			ball.body.position[1] = 0;
			ball.body.velocity[0] = 0;
			ball.body.velocity[1] = 0;
			ball.counter = 3;
			ball.isStart = false;
			ball.speed[0] = 0;
			ball.speed[1] = 0;
			ball.speedFactor = 2;
		}
	};
	ball.body.addShape(shape);

	return ball;
    }
}
