let lines = [];
let noiseOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textFont('Courier');
  textSize(14);
  fill(0, 255, 0);
  frameRate(60);
}

function draw() {
  background(0, 150); // Deja un rastro
  noiseOffset += 0.01;
  
  for (let i = 0; i < 100; i++) {
    let x = floor(random(width / 10)) * 10;
    let y = floor(random(height / 20)) * 20;
    let char = String.fromCharCode(33 + floor(random(94))); // caracteres ASCII visibles
    let brightness = noise(x * 0.01, y * 0.01, noiseOffset) * 255;

    fill(0, brightness, 0);
    text(char, x, y);
  }

  // Opcional: efecto de glitch
  if (frameCount % 5 === 0) {
    let glitchX = random(width);
    let glitchY = random(height);
    let glitchW = random(10, 100);
    let glitchH = random(5, 30);
    copy(glitchX, glitchY, glitchW, glitchH, glitchX + random(-20, 20), glitchY + random(-10, 10), glitchW, glitchH);
  }
}
