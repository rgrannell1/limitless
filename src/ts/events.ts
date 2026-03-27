import { renderLimitBarText } from "./components.ts"
import { Context } from "./types.ts"

const MOVE_RATE = 200;

function bindShipEvents(context: Context) {
  const { ship } = context.state;

  console.log ( ship )

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

function bindCursorEvents(context: Context) {
  onMouseMove(() => {
    context.state.cursor.pos = pos(mousePos().x, mousePos().y)
  });


  onMouseRelease(() => {
    const { ship, limitsBar } = context.state;

    // cool, so check we have points left then decrease them
    if (limitsBar.value > 0) {
      console.log(`decreasing limitsBar.value from ${limitsBar.value} to ${limitsBar.value - 1}`)

      limitsBar.value -= 1;
      limitsBar.text = renderLimitBarText(limitsBar)
    }

    // we do, so jump around, jump around

    ship.pos = [mousePos().x, mousePos().y];
  })
}


export function bindEvents(context: Context) {
  bindShipEvents(context)
  bindCursorEvents(context)
}
