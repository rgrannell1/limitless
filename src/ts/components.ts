import { DIMENSION, LIMIT_TEXT_SIZE } from "./constants"

export function Ship() {
  return [
    rect(32, 32, "red"),
    pos(  DIMENSION / 2, DIMENSION / 2),
    "shape"
  ]
}

export function renderTimerText (timer: any) {
  const value = timer.value || 0;
  const minutes = Math.floor(value / 60)
  const seconds = value % 60

  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export function Timer() {
  return [
    text(renderTimerText(0)),
    pos(DIMENSION - 120, 30),
    { value: 0 }
  ]
}

export function Background() {
  return [

  ]
}

export function LimitsBar() {
  return [
    text("◈ ◈ ◈", { size: LIMIT_TEXT_SIZE }),
    pos(50, 25),
    { value: 3 }
  ]
}

export function Cursor() {
  return [

  ]
}
