import kaplay from "kaplay";
import "kaplay/global";

import {
  Enemy,
  LimitTokens,
  SprinklerFiringPattern,
} from "./components/index.ts";
import { CENTRE, DIMENSION, SHOOTER_FIRING_RATE } from "./commons/constants.ts";
import { bindTokenEvent, explode } from "./events.ts";
import { getRegularPolygonVertex } from "./commons/math.ts";
import type {
  Context,
  FiringPatternParameters,
  Level,
} from "./commons/types.ts";
import { ShooterFiringPattern } from "./components/FiringPattern.ts";

/**
 * Get spawn positions arranged in a regular polygon around the center
 */
function getSpawnPositions(sides: number) {
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

export function spawnToken(context: Context) {
  const { tokens, ship } = context.state;

  if (!ship) return;

  const shipX = ship.pos.x;
  const shipY = ship.pos.y;

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

export function spawnEnemy(
  context: Context,
  levelConfig: Level,
  firingParams: FiringPatternParameters,
  sides: number = 2,
) {
  const { enemies, intervals } = context.state;

  let idx = 0;

  for (const vertex of getSpawnPositions(sides)) {
    const enemyType = levelConfig.enemyTypes[idx];
    const enemy = add(Enemy({
      type: enemyType,
      position: [vertex.x, vertex.y],
    }));

    enemy.onCollide("shape", (obj) => {
      if (obj === context.state.ship) {
        explode(context);
      }
    });

    enemies.push(enemy);

    if (enemyType === "sprinkler") {
      const intervalId = SprinklerFiringPattern(context, firingParams, enemy);
      intervals.push(intervalId);
    } else if (enemyType === "shooter") {
      const intervalId = ShooterFiringPattern(
        context,
        SHOOTER_FIRING_RATE,
        enemy,
      );
      intervals.push(intervalId);
    } else {
      throw new Error(`Unknown enemy type ${enemyType}`);
    }

    idx++;
  }
}
