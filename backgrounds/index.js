const colors = {
  levelOne: {
    stroke: "#fec7ed",
    background: "#fff0fa",
  },
  levelTwo: {
    stroke: "#c7fed9",
    background: "#f0fff3",
  },
  levelThree: {
    stroke: "#c7d9fe",
    background: "#f0f7ff",
  },
  levelFour: {
    stroke: "#ffffd4",
    background: "#fffdf0",
  },
  levelFive: {
    stroke: "#c7fecf",
    background: "#f0fff3",
  },
};

// same algo as math.py
function ngon(ctx, x, y, size, sides) {
  const angle = (2 * Math.PI) / sides;
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const px = x + size * Math.cos(i * angle - Math.PI / 2);
    const py = y + size * Math.sin(i * angle - Math.PI / 2);
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.closePath();
  ctx.stroke();
}

function level(ctx, palette, tiler) {
  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, 400, 400);

  ctx.strokeStyle = palette.stroke;

  for (let ith = 0; ith < 100; ith++) {
    for (let jth = 0; jth < 100; jth++) {
      const x = (ith * 30) + 10;
      const y = (jth * 30) + 18;
      const size = 15;
      tiler(ctx, x, y, size);
    }
  }
}

function levelOne(ctx) {
  const tiler = (ctx, x, y, size) => {
    ngon(ctx, x, y, size, 3);
  };

  level(ctx, colors.levelOne, tiler);
}

function levelTwo(ctx) {
  const tiler = (ctx, x, y, size) => {
    ngon(ctx, x, y, size, 4);
  };

  level(ctx, colors.levelTwo, tiler);
}

function levelThree(ctx) {
  const tiler = (ctx, x, y, size) => {
    ngon(ctx, x, y, size, 5);
  };

  level(ctx, colors.levelThree, tiler);
}

function levelFour(ctx) {
  const tiler = (ctx, x, y, size) => {
    ngon(ctx, x, y, size, 6);
  };

  level(ctx, colors.levelFour, tiler);
}

function levelFive(ctx) {
  const tiler = (ctx, x, y, size) => {
    ngon(ctx, x, y, size, 8);
  };

  level(ctx, colors.levelFive, tiler);
}

const $bg1 = document.getElementById("bg1");
levelOne($bg1.getContext("2d"));

const $bg2 = document.getElementById("bg2");
levelTwo($bg2.getContext("2d"));

const $bg3 = document.getElementById("bg3");
levelThree($bg3.getContext("2d"));

const $bg4 = document.getElementById("bg4");
levelFour($bg4.getContext("2d"));

const $bg5 = document.getElementById("bg5");
levelFive($bg5.getContext("2d"));
