import { renderTimerText } from "./components/Timer.ts";
import { TOKEN_SPAWN_RATE } from "./commons/constants.ts";
import { spawnToken } from "./scenes.ts";
import type { Context } from "./commons/types.ts";
import { ShipSparkle } from "./components/Ship.ts";

export function bindIntervals(context: Context) {
  const state = context.state;

  const timerIntervalId = setInterval(() => {
    const timer = state.timer;
    if (!timer) {
      return;
    }

    if (timer.value > 0) {
      timer.value -= 1;
      timer.text = renderTimerText(timer);
    } else if (timer.value === 0) {
      timer.value = -1;

      // Clear all intervals before transitioning
      state.intervals.forEach((intervalId: number) =>
        clearInterval(intervalId)
      );
      state.intervals = [];

      context.state.level += 1;
      go("game");
    }
  }, 1000);

  const tokenIntervalId = setInterval(() => {
    if (state.limitsBar.value < 5) {
      spawnToken(context);
    }
  }, TOKEN_SPAWN_RATE);

  const sparkleIntervalId = setInterval(() => {
    add(ShipSparkle(context.state.ship.pos));
  }, 50);

  // Store all intervals so they can be cleared on level change
  state.intervals.push(timerIntervalId, tokenIntervalId, sparkleIntervalId);
}
