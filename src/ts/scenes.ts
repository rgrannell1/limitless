
import kaplay from "kaplay";
import "kaplay/global";

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
import type { Context, Level } from "./commons/types.ts";

kaplay({
  width: DIMENSION,
  height: DIMENSION,
  scale: 3,
  background: "#000000",
  canvas: document.getElementById("canvas") as any,
});

const LEVELS: Level[] = [
  {
    sides: 2,
    timer: 20,
    background: "level-1",
  },
  {
    sides: 3,
    timer: 25,
    background: "level-1",
  }
]

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
  const { enemies, firingPatternIntervals } = context.state;

  for (const vertex of listSpawnPositions(sides)) {
    const enemy = add(Enemy({ position: [vertex.x, vertex.y] }));

    enemy.onCollide("shape", obj => {
      if (obj === context.state.ship) {
        explode(context);
      }
    });

    enemies.push(enemy);
    const intervalId = SprinklerFiringPattern(context, enemy);
    firingPatternIntervals.push(intervalId);
  }
}

const context: Context = {} as Context;
context.state = {
  hyperfocus: false,
  level: 0,
  enemies: [],
  tokens: [],
  firingPatternIntervals: [],
};

export function registerGameScene() {
  scene("game", () => {
    const levelConfig = LEVELS[context.state.level];

    const { timer, sides } = levelConfig;

    context.state.ship = add(Ship());
    context.state.limitsBar = add(LimitsBar());
    context.state.cursor = add(Cursor());


    context.state.timer = add(Timer(timer));
    context.state.enemies = [];
    context.state.tokens = [];
    context.state.firingPatternIntervals = [];

    add([
      sprite(levelConfig.background),
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
      text("LIMITLESS", {
        size: 50,
        font: "pixelpurl",
      }),
      pos(120, 60),
    ])

    add([
      text("[ Press Enter to Start ]", {
        size: 27,
        font: "pixelpurl",
      }),
      pos(100, CENTRE),
    ]);

    add([
      text("[ space ] => click    hyperjump. ", {
        size: 20,
        font: "pixelpurl",
      }),
      pos(100, CENTRE + 40),
    ]);

    onKeyPress("enter", () => {
      go("game");
    });
  });
}

export function register() {
  registerGameScene();
  registerMenuScene();
}
