import {
  Background,
  Cursor,
  Enemy,
  FiringPattern,
  LimitsBar,
  LimitTokens,
  Ship,
  Timer,
} from "./components/index.ts";
import { CENTRE, DIMENSION } from "./constants.ts";
import { bindEvents, bindTokenEvent } from "./events.ts";
import { bindIntervals } from "./intervals.ts";
import { getRegularPolygonVertex } from "./math.ts";
import { Context } from "./types.ts";

export function spawnToken(context: Context) {
  const { tokens } = context.state;

  // spawn within radius of centre
  const position: [number, number] = [
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100),
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100),
  ];

  const token = add(LimitTokens({ position }));
  bindTokenEvent(context, token);

  tokens.push(token);
}

const centerX = CENTRE;
const centerY = CENTRE;
const radius = DIMENSION / 3;
const sides = 3;

const startAngle = -Math.PI / 2;

const triangle = [
  getRegularPolygonVertex(centerX, centerY, radius, sides, 0, startAngle),
  getRegularPolygonVertex(centerX, centerY, radius, sides, 1, startAngle),
  getRegularPolygonVertex(centerX, centerY, radius, sides, 2, startAngle),
];

function spawnEnemy(context: Context) {
  const { enemies } = context.state;

  const position: [number, number] = [
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100),
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100),
  ];

  for (const vertex of triangle) {
    enemies.push(add(Enemy({ position: [vertex.x, vertex.y] })));
    FiringPattern(context, { position: [vertex.x + 16, vertex.y + 16] });
  }
}

export function gameScene(context: Context) {
  context.state = {
    ship: add(Ship()),
    timer: add(Timer()),
    limitsBar: add(LimitsBar()),
    background: add(Background()),
    cursor: add(Cursor()),
    enemies: [],
    tokens: [],
  };

  spawnEnemy(context);

  bindEvents(context);
  bindIntervals(context);
}
