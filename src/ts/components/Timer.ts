
import { TIMER_X, TIMER_Y } from "../constants.ts";

export function renderTimerText(timer: any) {
  const value = timer.value || 0;
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function Timer() {
  return [
    text(renderTimerText({ value: 60 })),
    pos(TIMER_X, TIMER_Y),
    color(0, 0, 0),
    { value: 60 },
  ];
}
