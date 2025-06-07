
let artistPages = [
  "modules/anna_ridler.html",
  "modules/cristina_garcia_rodero.html",
  "modules/etel_adnan.html",
  "modules/heather_dewey_hagborg.html",
  "modules/hito_steyerl.html",
  "modules/joan_jonas.html",
  "modules/julie_freeman.html",
  "modules/karen_palacio.html",
  "modules/laurie_anderson.html",
  "modules/monica_gomez.html",
  "modules/rosalia_de_castro.html",
  "modules/tacita_dean.html",
  "modules/valie_export.html"
];

let papers = [];
let numPapers = 13;
let groupRotation = 0;
let lastInteractionTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  noStroke();
  for (let i = 0; i < numPapers; i++) {
    papers.push(new Paper(i));
  }

  // Cambio automático cada 13 segundos si no hay interacción
  setInterval(() => {
    let elapsed = millis() - lastInteractionTime;
    if (elapsed > 13000) {
      let index = floor(random(artistPages.length));
      window.location.href = artistPages[index];
    }
  }, 13000);
}

function mousePressed() {
  lastInteractionTime = millis();
  for (let paper of papers) {
    if (paper.isMouseOver()) {
      let targetURL = artistPages[paper.index];
      window.location.href = targetURL;
      break;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



let papers = [];
let numPapers = 13;
let groupRotation = 0;

 {
  for (let paper of papers) {
    if (paper.isMouseOver()) {
      let targetURL = artistPages[paper.index];
      window.location.href = targetURL;
      break;
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

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
    fill(this.isMouseOver() ? 255 : 220, 180); // más contraste
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
