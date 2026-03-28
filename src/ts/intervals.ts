import { renderTimerText } from "./components/Timer.ts";
import { TOKEN_SPAWN_RATE } from "./commons/constants.ts";
import { type Level, setLevelConfig, spawnToken } from "./scenes.ts";
import type { Context } from "./commons/types.ts";
import { ShipSparkle } from "./components/Ship.ts";

export function bindIntervals(context: Context) {
  const state = context.state;

  setInterval(() => {
    const timer = state.timer;
    if (!timer) {
      return;
    }

    if (timer.value > 0) {
      timer.value -= 1;
      timer.text = renderTimerText(timer);
    } else if (timer.value === 0) {
      timer.value = -1;

      state.firingPatternIntervals.forEach(intervalId => clearInterval(intervalId));
      state.firingPatternIntervals = [];

      setLevelConfig({ sides: 3, timer: 25 });
      go("game");
    }
  }, 1000);

  setInterval(() => {
    if (state.limitsBar.value < 5) {
      spawnToken(context);
    }
  }, TOKEN_SPAWN_RATE);

  setInterval(() => {
    add(ShipSparkle(context.state.ship.pos));
  }, 50);
}
