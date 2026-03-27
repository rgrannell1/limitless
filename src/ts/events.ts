import { renderLimitBarText } from "./components.ts";
import { Context } from "./types.ts";

const MOVE_RATE = 200;

function bindShipEvents(context: Context) {
  const { ship } = context.state;

  console.log(ship);

  onKeyDown("right", () => {
    ship.move(MOVE_RATE, 0);
  });

  onKeyDown("left", () => {
    ship.move(-MOVE_RATE, 0);
  });
  onKeyDown("up", () => {
    ship.move(0, -MOVE_RATE);
  });
  onKeyDown("down", () => {
    ship.move(0, MOVE_RATE);
  });
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
  const steps = Math.ceil(distance / 5);

  console.log({xDiff, yDiff, distance, steps});

  for (let ith = 0; ith < steps; ith++) {
    const x = currentX + xDiff * (ith / steps);
    const y = currentY + yDiff * (ith / steps);

    add([
      rect(32, 32),
      pos(x, y),
      color(255, 255, 255),
      lifespan(0.5, { fade: 0.5 }),
      opacity(0.8),
      "jumpEffect",
    ]);
  }
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
    console.log(
      `decreasing limitsBar.value from ${limitsBar.value} to ${
        limitsBar.value - 1
      }`,
    );

    limitsBar.value -= 1;
    limitsBar.text = renderLimitBarText(limitsBar);

    const targetX = mousePos().x;
    const targetY = mousePos().y;

    const currentX = ship.pos.x;
    const currentY = ship.pos.y;

    console.log(({ currentX, currentY, targetX, targetY }));
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

  token.onCollide("shape", () => {
    limitsBar.value += 1;
    limitsBar.text = renderLimitBarText(limitsBar);

    token.destroy();
  });
}
