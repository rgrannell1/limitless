
import { renderLimitBarText } from "./components/LimitsBar.ts";
import { paletteColor } from "./commons/constants.ts";
import { Context } from "./commons/types.ts";

const MOVE_RATE = 100;

function bindShipEvents(context: Context) {
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

  onKeyDown("space", () => startJumpShip(context));
}

/*
 * Render a jump effect
 */
function renderJumpTrail(
  currentX: number,
  currentY: number,
  targetX: number,
  targetY: number,
) {
  const xDiff = targetX - currentX;
  const yDiff = targetY - currentY;

  const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  const steps = Math.ceil(distance / 14);

  for (let ith = 0; ith < steps; ith++) {
    const progress = ith / steps;
    const x = currentX + xDiff * progress;
    const y = currentY + yDiff * progress;

    add([
      text("□", { size: 32 }),
      pos(x, y - 8),
      paletteColor("magenta"),
      lifespan(0.5, { fade: 0.3 }),
      opacity(0.8 * progress),
      "jumpEffect",
    ]);
  }
}

function startJumpShip(context: Context) {
  // slow down the time rate
  // pause movement

  onKeyDown("space", () => {
    context.state.hyperfocus = true;

    const currentX = context.state.ship.pos.x - 8;
    const currentY = context.state.ship.pos.y - 8;

    // render a little animation beneath the ship
    const jumper = add([
      sprite("jump"),
      pos(currentX, currentY),
      lifespan(0.5, { fade: 0.3 }),
      opacity(0.6),
    ])
    jumper.play("jump");

  });
}

export function explode(context: Context) {
    const currentX = context.state.ship.pos.x - 8;
    const currentY = context.state.ship.pos.y - 8;

    context.state.ship.destroy()

    const bang = add([
      sprite("bang"),
      pos(currentX, currentY),
      lifespan(0.5, { fade: 0.3 }),
      opacity(0.6),
    ])
    bang.play("bang");

    setTimeout(() => location.reload(), 1000)
}


function jumpShip(context: Context) {
  const { ship, limitsBar } = context.state;

  if (!context.state.hyperfocus) {
    return;
  }

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

  renderJumpTrail(currentX, currentY, targetX, targetY);

  // we do, so jump around, jump around
  ship.moveTo(targetX, targetY);

  context.state.hyperfocus = false;
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
