
import type { GameObj } from "kaplay"

// Game state
type State = {
  ship: GameObj | null
  enemies: GameObj[]
  tokens: GameObj[]
  timer?: GameObj
  limitsBar?: GameObj
  cursor?: GameObj
}

// Context passed around generally
type Context = {
  state: State
}]

export type EnemyType = "line"

export type { GameObj }
export type { State, Context }
