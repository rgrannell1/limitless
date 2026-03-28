import {
  Cursor,
  Enemy,
  SprinklerFiringPattern,
  LimitsBar,
  LimitTokens,
  Ship,
  Timer,
} from "./components/index.ts";
import { CENTRE, DIMENSION } from "./commons/constants.ts";
import { bindEvents, bindTokenEvent } from "./events.ts";
import { bindIntervals } from "./intervals.ts";
import { getRegularPolygonVertex } from "./commons/math.ts";
import type { Context } from "./commons/types.ts";

export function spawnToken(context: Context) {
  const { tokens } = context.state;

  const shipX = context.state.ship.pos.x;
  const shipY = context.state.ship.pos.y;

  // spawn it pretty close to the player, otherwise it's not worth the risk
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * (DIMENSION / 8);

  const position: [number, number] = [
    shipX + Math.cos(angle) * distance,
    shipY + Math.sin(angle) * distance,
  ];

  const token = add(LimitTokens({ position }));
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


function spawnEnemy(context: Context) {
  const { enemies } = context.state;

  for (const vertex of listSpawnPositions(2)) {
    const enemy = add(Enemy({ position: [vertex.x, vertex.y] }));

    enemy.onCollide("shape", obj => {
      if (obj === context.state.ship) {
        location.reload();
      }
    });

    enemies.push(enemy);
    SprinklerFiringPattern(context, enemy);
  }
}

export function registerGameScene() {
  scene("game", (context: Context) => {

    let levelTimer = 20;

    context.state = {
      hyperfocus: false,
      ship: add(Ship()),
      timer: add(Timer(levelTimer)),
      limitsBar: add(LimitsBar()),
      cursor: add(Cursor()),
      enemies: [],
      tokens: [],
    };

    spawnEnemy(context);

    bindEvents(context);
    bindIntervals(context);
  });
}

export function registerMenuScene() {
  scene("menu", () => {
    add([
      text("Press Enter to Start", { size: 32 }),
      pos(CENTRE, CENTRE)
    ]);

    onKeyPress("enter", ( ) => {
      go("game");
    });
  });
}

export function register() {
  registerGameScene();
  registerMenuScene();
}
