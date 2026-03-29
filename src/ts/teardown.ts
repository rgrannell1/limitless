
import type { Context } from "./commons/types.ts";

export function clearIntervals(context: Context) {
  for (const interval of context.state.intervals) {
    clearInterval(interval);
  }
  context.state.intervals = [];
}
