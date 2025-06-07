let blocks = [];
let palette;

function setup() {
  createCanvas(600, 760);
  noStroke();
  frameRate(30);

  palette = [
    '#f0cd2f', '#1576b4', '#ffffff', '#da4e34', '#bc8b74',
    '#20a7c0', '#07122c', '#e4b64a', '#6f1d1b', '#f3d3c3',
    '#215732', '#bc3a3a', '#23191c', '#426f3b', '#68b4b0'
  ];

  // Cargar formas originales inspiradas directamente en el cuadro
  blocks = [
    new Block(0, 0, 600, 760, palette[0]), // fondo
    new Block(300, 50, 150, 120, palette[1]),
    new Block(250, 160, 50, 50, palette[2]),
    new Block(250, 210, 100, 50, palette[3]),
    new Block(270, 260, 80, 40, palette[4]),
    new Block(340, 300, 80, 60, palette[5]),
    new Block(420, 310, 60, 40, palette[6]),
    new Block(400, 40, 160, 160, palette[7]),
    new Block(170, 320, 80, 50, palette[8]),
    new Block(220, 370, 60, 30, palette[9]),
    new Block(180, 400, 40, 50, palette[10]),
    new Block(230, 400, 50, 40, palette[11]),
    new Block(440, 680, 40, 40, palette[12]),
    new Block(90, 600, 40, 50, palette[13]),
    new Block(130, 550, 40, 60, palette[14])
  ];

  // Nueva composición cada 5 segundos
  setInterval(() => {
    for (let b of blocks) b.setNewComposition();
  }, 5000);
}

function draw() {
  background(palette[0]); // color base

  for (let b of blocks) {
    b.update();
    b.display();
  }
}

function mouseMoved() {
  for (let b of blocks) {
    b.scatter(); // alejar en libertad
  }
}

function mousePressed() {
  // Intercambiar colores entre todos los bloques
  let newColors = shuffle(palette.slice(1)); // omitimos fondo
  for (let i = 1; i < blocks.length; i++) {
    blocks[i].setColor(color(newColors[i % newColors.length]));
  }
}

class Block {
  constructor(x, y, w, h, c) {
    this.init = createVector(x, y); // para mantener proporción visual original
    this.pos = createVector(x, y);
    this.target = this.pos.copy();
    this.w = w;
    this.h = h;
    this.c = color(c);
  }

  setColor(newC) {
    this.c = newC;
  }

  setNewComposition() {
    // Dentro de la zona central del canvas
    let pad = 60;
    this.target = createVector(
      random(pad, width - this.w - pad),
      random(pad, height - this.h - pad)
    );
  }

  scatter() {
    this.target = createVector(
      random(-this.w, width + this.w),
      random(-this.h, height + this.h)
    );
  }

  update() {
    this.pos = p5.Vector.lerp(this.pos, this.target, 0.03);
  }

  display() {
    fill(this.c);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
}
