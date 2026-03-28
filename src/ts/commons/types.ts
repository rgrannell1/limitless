import type { GameObj } from "kaplay";

// Game state
export type State = {
  hyperfocus: boolean;
  ship?: GameObj;
  level: number;
  enemies: GameObj[];
  tokens: GameObj[];
  timer?: GameObj;
  limitsBar?: GameObj;
  cursor?: GameObj;
  firingPatternIntervals: number[];
};

// Context passed around generally
export type Context = {
  state: State;
};

export type EnemyType = "line";


export type Level = {
  sides: number;
  timer: number;
  background: string;
};
