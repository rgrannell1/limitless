import {
  Background,
  Cursor,
  Enemy,
  LimitsBar,
  LimitTokens,
  Ship,
  Timer,
} from "./components.ts";
import { DIMENSION } from "./constants.ts";
import { bindEvents, bindTokenEvent } from "./events.ts";
import { bindIntervals } from "./intervals.ts";
import { Context } from "./types.ts";

export function spawnToken(context: Context) {
  const { tokens } = context.state;

  const position: [number, number] = [
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100),
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100),
  ];

  const token = add(LimitTokens({ position }));
  bindTokenEvent(context, token);

  tokens.push(token);
}

function getRegularPolygonVertex(
  centerX: number,
  centerY: number,
  vertexRadius: number,
  sideCount: number,
  vertexIndex: number,
  startAngleRadians = 0
) {
  const angle = startAngleRadians + (2 * Math.PI * vertexIndex) / sideCount;

  return {
    x: centerX + vertexRadius * Math.cos(angle),
    y: centerY + vertexRadius * Math.sin(angle)
  };
}

const centerX = DIMENSION / 2;
const centerY = DIMENSION / 2;
const radius = DIMENSION / 3;
const sides = 3;

const startAngle = -Math.PI / 2;

const triangle = [
  getRegularPolygonVertex(centerX, centerY, radius, sides, 0, startAngle),
  getRegularPolygonVertex(centerX, centerY, radius, sides, 1, startAngle),
  getRegularPolygonVertex(centerX, centerY, radius, sides, 2, startAngle)
];

function spawnEnemy(context: Context) {
  const { enemies } = context.state;

  const position: [number, number] = [
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100),
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100),
  ];

  for (const vertex of triangle) {
    enemies.push(add(Enemy({ position: [vertex.x, vertex.y] })));
  }
}

export function gameScene(context: Context) {
  context.state.ship = add(Ship());
  context.state.timer = add(Timer());
  context.state.limitsBar = add(LimitsBar());
  context.state.background = add(Background());
  context.state.cursor = add(Cursor());

  spawnEnemy(context);

  bindEvents(context);
  bindIntervals(context);
}
