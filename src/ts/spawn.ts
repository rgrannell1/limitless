import kaplay from "kaplay";
import "kaplay/global";

import {
  Enemy,
  LimitTokens,
  SprinklerFiringPattern,
} from "./components/index.ts";
import { CENTRE, DIMENSION } from "./commons/constants.ts";
import { bindTokenEvent, explode } from "./events.ts";
import { getRegularPolygonVertex } from "./commons/math.ts";
import type { Context, FiringPatternParameters } from "./commons/types.ts";

export function spawnToken(context: Context) {
  const { tokens } = context.state;

  const shipX = context.state.ship.pos.x;
  const shipY = context.state.ship.pos.y;

  // spawn it pretty close to the player, otherwise it's not worth the risk
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.max(Math.random() * (DIMENSION / 8), 40);

  const position: [number, number] = [
    shipX + Math.cos(angle) * distance,
    shipY + Math.sin(angle) * distance,
  ];

  const token = add(LimitTokens({ position }));
  const sparkle = add([
    sprite("token-sparkle"),
    pos(position[0] - 6, position[1]),
    lifespan(0.5, { fade: 0.3 }),
    opacity(0.6),
    z(-1),
  ]);
  sparkle.play("token-sparkle");

  bindTokenEvent(context, token);

  tokens.push(token);
}

function listSpawnPositions(sides: number) {
  const centerX = CENTRE;
  const centerY = CENTRE;
  const radius = DIMENSION / 3;

  const startAngle = -Math.PI / 2;

  const vertices: { x: number; y: number }[] = [];
  for (let idx = 0; idx < sides; idx++) {
    vertices.push(
      getRegularPolygonVertex(centerX, centerY, radius, sides, idx, startAngle),
    );
  }

  return vertices;
}

export function spawnEnemy(
  context: Context,
  firingParams: FiringPatternParameters,
  sides: number = 2,
) {
  const { enemies, intervals } = context.state;

  for (const vertex of listSpawnPositions(sides)) {
    const enemy = add(Enemy({ position: [vertex.x, vertex.y] }));

    enemy.onCollide("shape", (obj) => {
      if (obj === context.state.ship) {
        explode(context);
      }
    });

    enemies.push(enemy);
    const intervalId = SprinklerFiringPattern(context, firingParams, enemy);
    intervals.push(intervalId);
  }
}
