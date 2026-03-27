import type { GameObj } from "kaplay";

// Game state
type State = {
  hyperfocus: boolean;
  background: GameObj;
  ship: GameObj;
  enemies: GameObj[];
  tokens: GameObj[];
  timer?: GameObj;
  limitsBar?: GameObj;
  cursor?: GameObj;
};

// Context passed around generally
type Context = {
  state: State;
};

export type EnemyType = "line";
