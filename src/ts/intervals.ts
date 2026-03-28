
import { renderTimerText } from "./components/Timer.ts";
import { TOKEN_SPAWN_RATE } from "./commons/constants.ts";
import { spawnToken } from "./scenes.ts";
import type { Context } from "./commons/types.ts";

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
    }
  }, 1000);

  setInterval(() => {
    spawnToken(context);
  }, TOKEN_SPAWN_RATE);
}
