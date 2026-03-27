import { renderTimerText } from "./components.ts"
import { Context } from "./types.ts"


export function bindIntervals(context: Context) {
  setInterval(() => {
    if (!context.state.timer) {
      return
    }

    context.state.timer.value += 1
    context.state.timer.text = renderTimerText(context.state.timer)

  }, 1000)
}