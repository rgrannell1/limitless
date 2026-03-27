import { DIMENSION } from "./constants"

export function Ship() {
  return [
    rect(32, 32, "red"),
    pos(40, 30),
    "shape"
  ]
}

export function renderTimerText (timer: any) {
  const minutes = Math.floor(timer.value / 60)
  const seconds = timer.value % 60

  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export function Timer() {
  return [
    text(renderTimerText(0)),
    pos(DIMENSION - 120, 30),
    { value: 0 }
  ]
}
