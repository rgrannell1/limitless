
const colors = {
  levelOne: {
    stroke: "#fec7ed",
    background: "#fff0fa",
  },
  levelTwo: {
    stroke: "#c7fed9",
    background: "#f0fff3",
  }
};

function triangle(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x + size / 2, y - size);
  ctx.closePath();

  ctx.stroke();
}

function square(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x + size, y - size);
  ctx.lineTo(x, y - size);
  ctx.closePath();

  ctx.stroke();
}

// let's tile with triangles
function levelOne(ctx) {
  ctx.fillStyle = colors.levelOne.background;
  ctx.fillRect(0, 0, 400, 400);

  ctx.strokeStyle = colors.levelOne.stroke;

  for (let ith = 0; ith < 100; ith++) {
    for (let jth = 0; jth < 100; jth++) {
      const x = (ith * 30) + 10;
      const y = (jth * 30) + 18;
      const size = 15;
      triangle(ctx, x, y, size);
    }
  }
}

function levelTwo(ctx) {
  ctx.fillStyle = colors.levelTwo.background;
  ctx.fillRect(0, 0, 400, 400);

  ctx.strokeStyle = colors.levelTwo.stroke;

  for (let ith = 0; ith < 100; ith++) {
    for (let jth = 0; jth < 100; jth++) {
      const x = (ith * 30) + 10;
      const y = (jth * 30) + 18;
      const size = 15;
      square(ctx, x, y, size);
    }
  }
}


const $bg1 = document.getElementById("bg1");
levelOne($bg1.getContext("2d"));

const $bg2 = document.getElementById("bg2");
levelTwo($bg2.getContext("2d"));
