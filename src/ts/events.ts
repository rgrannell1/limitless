
import { renderLimitBarText } from "./components/LimitsBar.ts";
import { Context } from "./types.ts";

const MOVE_RATE = 100;

function bindShipEvents(context: Context) {
  const { ship } = context.state;

  onUpdate(() => {
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

  onKeyDown("space", () => startJumpShip(context));
}

/*
 * Render a jump effect
 */
function renderJumpEffect(
  currentX: number,
  currentY: number,
  targetX: number,
  targetY: number,
) {
  const xDiff = targetX - currentX;
  const yDiff = targetY - currentY;

  const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  const steps = Math.ceil(distance / 14);

  console.log({ xDiff, yDiff, distance, steps });

  for (let ith = 0; ith < steps; ith++) {
    const x = currentX + xDiff * (ith / steps);
    const y = currentY + yDiff * (ith / steps);

    add([
      text("□", { size: 32 }),
      pos(x, y),
      color(220, 220, 220),
      lifespan(0.5, { fade: 0.3 }),
      opacity(0.8),
      "jumpEffect",
    ]);
  }
}

function startJumpShip(context: Context) {
  // slow down the time rate
  // pause movement


}


function jumpShip(context: Context) {
  const { ship, limitsBar } = context.state;
  if (!limitsBar) {
    throw new Error("limitsBar is not defined in state");
  }

  if (limitsBar.value === 0) {
    return;
  }

  // cool, so check we have points left then decrease them
  limitsBar.value -= 1;
  limitsBar.text = renderLimitBarText(limitsBar);

  const mouse = mousePos();

  const targetX = mouse.x;
  const targetY = mouse.y;

  const currentX = ship.pos.x;
  const currentY = ship.pos.y;

  console.log({ currentX, currentY, targetX, targetY });
  renderJumpEffect(currentX, currentY, targetX, targetY);

  // we do, so jump around, jump around
  ship.moveTo(targetX, targetY);
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

export function bindEvents(context: Context) {
  bindShipEvents(context);
  bindCursorEvents(context);
}

export function bindTokenEvent(context: Context, token: any) {
  const { limitsBar } = context.state;
  if (!limitsBar) {
    throw new Error("limitsBar is not defined in state");
  }

  token.onCollide("shape", () => {
    if (limitsBar.value >= 5) {
      return;
    }

    limitsBar.value += 1;
    limitsBar.text = renderLimitBarText(limitsBar);

    token.destroy();
  });
}
