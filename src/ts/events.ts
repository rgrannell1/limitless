import { renderLimitBarText } from "./components/LimitsBar.ts";
import { playExplosionEffect } from "./effects.ts";
import { startJump, executeJump } from "./hyperfocus.ts";
import type { Context } from "./commons/types.ts";

const MOVE_RATE = 100;

/**
 * Bind ship movement to mouse position
 */
function bindShipMovement(context: Context) {
  const { ship } = context.state;

  onUpdate(() => {
    // nope.
    if (context.state.hyperfocus) {
      return;
    }

    const mouseX = mousePos().x;
    const mouseY = mousePos().y;
    const shipX = ship.pos.x;
    const shipY = ship.pos.y;

    const dx = mouseX - shipX;
    const dy = mouseY - shipY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      const dirX = dx / distance;
      const dirY = dy / distance;
      ship.move(dirX * MOVE_RATE, dirY * MOVE_RATE);
    }
  });
}

/**
 * Bind jump/hyperfocus input
 */
function bindJumpInput(context: Context) {
  onKeyDown("space", () => startJump(context));
  onMousePress(() => executeJump(context));
}

/**
 * Bind cursor position to mouse
 */
function bindCursorMovement(context: Context) {
  onMouseMove(() => {
    if (!context.state.cursor) {
      return;
    }

    context.state.cursor.pos = [mousePos().x, mousePos().y];
  });
}

/**
 * Trigger explosion and end game
 */
export function explode(context: Context) {
  playExplosionEffect(context);
}

/**
 * Handle token collection event
 */
export function bindTokenEvent(context: Context, token: any) {
  const { limitsBar } = context.state;
  if (!limitsBar) {
    return;
  }

  token.onCollide("shape", () => {
    if (limitsBar.value >= 5) {
      return;
    }

    limitsBar.value += 1;
    limitsBar.text = renderLimitBarText(limitsBar);

    token.destroy();

    const sparkle = add([
      sprite("token-sparkle"),
      pos(token.pos.x - 6, token.pos.y),
      lifespan(0.5, { fade: 0.3 }),
      opacity(0.6),
      z(-1),
    ]);
    sparkle.play("token-sparkle");
  });
}

/**
 * Bind all game events
 */
export function bindEvents(context: Context) {
  bindShipMovement(context);
  bindJumpInput(context);
  bindCursorMovement(context);
}

function bindCursorEvents(context: Context) {
  onMouseMove(() => {
    if (!context.state.cursor) {
      throw new Error("cursor is not defined in state");
    }

    context.state.cursor.pos = [mousePos().x, mousePos().y];
  });

  onMouseRelease(() => jumpShip(context));
}
