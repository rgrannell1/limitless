
import { paletteColor, TIMER_TEXT_SIZE, TIMER_X, TIMER_Y } from "../constants.ts";

export function renderTimerText(timer: any) {
  const value = timer.value || 0;
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function Timer(seconds: number) {
  const timerText = renderTimerText({
    value: seconds
  });

  return [
    text(timerText, { size: TIMER_TEXT_SIZE, font: "pixelpurl" }),
    pos(TIMER_X, TIMER_Y),
    paletteColor("text"),
    { value: seconds },
  ];
}
