import kaplay from "kaplay";
import "kaplay/global";

import { renderLimitBarText } from "./components/LimitsBar.ts";
import type { Context } from "./commons/types.ts";
import { renderJumpTrail, playJumpAnimation } from "./effects.ts";

const MOVE_RATE = 100;

/**
 * Start the jump/hyperfocus mode - called when space is pressed
 */
export function startJump(context: Context) {
  if (context.state.limitsBar.value <= 0) {
    return;
  }

  context.state.hyperfocus = true;
  playJumpAnimation(context);
}

/**
 * Execute jump to target position and deduct limit
 */
export function executeJump(context: Context) {
  const { ship, limitsBar } = context.state;

  if (!context.state.hyperfocus) {
    return;
  }

  if (!limitsBar || limitsBar.value === 0) {
    return;
  }

  // Decrease limits
  limitsBar.value -= 1;
  limitsBar.text = renderLimitBarText(limitsBar);

  const mouse = mousePos();
  const targetX = mouse.x;
  const targetY = mouse.y;

  const currentX = ship.pos.x;
  const currentY = ship.pos.y;

  renderJumpTrail(currentX, currentY, targetX, targetY);

  // Jump to target
  ship.moveTo(targetX, targetY);

  context.state.hyperfocus = false;
}
