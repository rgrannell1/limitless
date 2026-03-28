import {
  Cursor,
  Enemy,
  LimitsBar,
  LimitTokens,
  Ship,
  SprinklerFiringPattern,
  Timer,
} from "./components/index.ts";
import { CENTRE, DIMENSION } from "./commons/constants.ts";
import { bindEvents, bindTokenEvent, explode } from "./events.ts";
import { bindIntervals } from "./intervals.ts";
import { getRegularPolygonVertex } from "./commons/math.ts";
import type { Context } from "./commons/types.ts";

export type Level = {
  sides: number;
  timer: number;
};

let levelConfig: Level = { sides: 2, timer: 20 };

export function setLevelConfig(config: Level) {
  levelConfig = config;
}

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

function spawnEnemy(context: Context, sides: number = 2) {
  const { enemies } = context.state;

  for (const vertex of listSpawnPositions(sides)) {
    const enemy = add(Enemy({ position: [vertex.x, vertex.y] }));

    enemy.onCollide("shape", (obj) => {
      if (obj === context.state.ship) {
        explode(context);
      }
    });

    enemies.push(enemy);
    SprinklerFiringPattern(context, enemy);
  }
}

export function registerGameScene() {
  scene("game", () => {
    console.log("Loading scene with config:", levelConfig);
    const context: Context = {} as Context;

    const { timer, sides } = levelConfig;

    context.state = {
      hyperfocus: false,
      ship: add(Ship()),
      timer: add(Timer(timer)),
      limitsBar: add(LimitsBar()),
      cursor: add(Cursor()),
      enemies: [],
      tokens: [],
    };

    add([
      sprite("level-1"),
      pos(0, 0),
      z(-2),
    ]);

    spawnEnemy(context, sides);

    bindEvents(context);
    bindIntervals(context);
  });
}

export function registerMenuScene() {
  scene("menu", () => {
    add([
      text("Press Enter to Start", { size: 32 }),
      pos(CENTRE, CENTRE),
    ]);

    onKeyPress("enter", () => {
      setLevelConfig({ sides: 2, timer: 20 });
      go("game");
    });
  });
}

export function register() {
  registerGameScene();
  registerMenuScene();
}
