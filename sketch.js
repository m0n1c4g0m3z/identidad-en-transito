
  let papers = [];
let numPapers = 13;
let groupRotation = 0;

let pieces = [
  'modules/etel_adnan.html',
  'modules/rosalia_de_castro.html',
  'modules/cristina_garcia_rodero.html',
  'modules/laurie_anderson.html',
  'modules/valie_export.html',
  'modules/joan_jonas.html',
  'modules/hito_steyerl.html',
  'modules/anna_ridler.html',
  'modules/heather_dewey-hagborg.html',
  'modules/julie_freeman.html',
  'modules/tacita_dean.html',
  'modules/karen_palacio.html'
];

let interaction = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  noStroke();
  for (let i = 0; i < numPapers; i++) {
    papers.push(new Paper(i));
  }

  // Iniciar temporizador de 13 segundos
  setTimeout(redirectToRandomPiece, 13000);

  // Escuchas de interacción
  window.addEventListener('mousemove', () => interaction = true);
  window.addEventListener('mousedown', () => interaction = true);
  window.addEventListener('touchstart', () => interaction = true);
  window.addEventListener('keydown', () => interaction = true);
}

function draw() {
  background(0); // Negro profundo y uniforme

  translate(width / 2, height / 2);
  rotate(groupRotation);
  translate(-width / 2, -height / 2);
  groupRotation += 0.001;

  stroke(255, 10); // Conexiones sutiles
  for (let i = 0; i < papers.length; i++) {
    for (let j = i + 1; j < papers.length; j++) {
      let a = papers[i];
      let b = papers[j];
      line(a.x, a.y, b.x, b.y);
    }
  }

  noStroke();
  for (let paper of papers) {
    paper.update();
    paper.display();
  }
}

function mousePressed() {
  for (let paper of papers) {
    if (paper.isMouseOver()) {
      print("Haz hecho click en el papel " + paper.index);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function redirectToRandomPiece() {
  if (!interaction) {
    const randomIndex = floor(random(pieces.length));
    window.location.href = pieces[randomIndex];
  }
}

// Clase Paper
class Paper {
  constructor(index) {
    this.index = index;
    this.r = random(40, 80);
    this.tx = random(1000);
    this.ty = random(2000);
    this.angle = random(TWO_PI);
    this.angleSpeed = random(0.002, 0.01);
    this.points = this.generateShape();
  }

  generateShape() {
    let points = [];
    let steps = floor(random(5, 9));
    for (let i = 0; i < steps; i++) {
      let angle = map(i, 0, steps, 0, TWO_PI);
      let radius = this.r + random(-15, 15);
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      points.push(createVector(x, y));
    }
    return points;
  }

  update() {
    this.x = noise(this.tx) * width;
    this.y = noise(this.ty) * height;
    this.tx += 0.002;
    this.ty += 0.002;
    this.angle += this.angleSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(this.isMouseOver() ? 255 : 220, 180);
    beginShape();
    for (let pt of this.points) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
    pop();
  }

  isMouseOver() {
    return dist(mouseX, mouseY, this.x, this.y) < this.r;
  }
}
