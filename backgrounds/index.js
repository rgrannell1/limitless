const $background = document.getElementById("background");
const ctx = $background.getContext("2d");

const colors = {
  levelOne: {
    stroke: "#fec7ed",
    background: "#fff0fa",
  },
};

function triangle(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x + size / 2, y - size);
  ctx.closePath();

  ctx.stroke();
}

// let's tile with triangles
function levelOne() {
  ctx.fillStyle = colors.levelOne.background;
  ctx.fillRect(0, 0, $background.width, $background.height);

  ctx.strokeStyle = colors.levelOne.stroke;

  for (let ith = 0; ith < 100; ith++) {
    for (let jth = 0; jth < 100; jth++) {
      const x = (ith * 30) + 10;
      const y = (jth * 30) + 18;
      const size = 15;
      triangle(x, y, size);
    }
  }
}

levelOne();
