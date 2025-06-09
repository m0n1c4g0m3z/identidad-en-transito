
let artistas;
let actual = 0;

function preload() {
  artistas = loadJSON('data.json');
}

function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  background(20);
  let art = artistas.artistas[actual];
  fill(art.color);

  for (let i = 0; i < art.intensidad * 10; i++) {
    let x = random(width);
    let y = random(height);
    switch (art.forma) {
      case "circulo":
        ellipse(x, y, 30, 30);
        break;
      case "cuadrado":
        rect(x, y, 30, 30);
        break;
      case "linea":
        line(x, y, x + 20, y + 20);
        break;
    }
  }
}

function keyPressed() {
  if (key === '1') actual = 0;
  if (key === '2') actual = 1;
  if (key === '3') actual = 2;
}
