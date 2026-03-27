
const MOVE_RATE = 200;

function bindShipEvents(context) {
  const ship = context.state.ship;

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

function bindCursorEvents(context) {
  onMouseMove(() => {
    context.state.cursor.pos = [mousePos().x, mousePos().y]
  })
}


export function bindEvents(context: Context) {
  bindShipEvents(context)
  bindCursorEvents(context)
}
