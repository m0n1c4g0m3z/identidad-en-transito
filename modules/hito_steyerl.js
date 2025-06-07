

let glitchRects = [];

let osc;

let cam;

let showCam = false;

let camTimer = 0;

let grayMode = false;

let collapseMode = false;

let surveillanceMode = false;

let invisibleMode = false;

let invisibilityStartTime = 0;

let mouseSpeed = 0;

let lastMouseX = 0;

let lastMouseY = 0;


let lastInteractionTime = 0;

let binaryBipTimer = 0;


let voices = [

  'I am watching',

  'Signal interference',

  'Tracking enabled',

  'System failure',

  'Feed corrupted',

  'Face recognized',

  'You are online',

  'Pattern detected'

];


function setup() {

  createCanvas(windowWidth, windowHeight);

  frameRate(30);

  textFont('monospace');

  noStroke();


  osc = new p5.Oscillator('sawtooth');

  osc.amp(0);

  osc.start();


  cam = createCapture(VIDEO);

  cam.size(width, height);

  cam.hide();


  camTimer = millis() + random(4000, 9000);

  lastInteractionTime = millis();

  binaryBipTimer = millis() + random(800, 1600);

}


function draw() {

  background(0);

  updateMouseSpeed();


  if (millis() > camTimer) {

    showCam = !showCam;

    camTimer = millis() + random(4000, 9000);

  }


  if (showCam) {

    push();

    tint(255, random(80, 160));

    image(cam, 0, 0, width, height);

    pop();

  }


  for (let i = 0; i < 8; i++) {

    let col = grayMode

      ? color(random(100, 255))

      : color(random(255), random(255), random(255));


    glitchRects.push({

      x: random(width),

      y: random(height),

      w: random(20, 160),

      h: random(10, 80),

      col: col,

      decay: int(random(5, 15))

    });

  }


  for (let i = glitchRects.length - 1; i >= 0; i--) {

    let r = glitchRects[i];

    fill(r.col);

    rect(r.x, r.y, r.w, r.h);

    r.decay--;

    if (r.decay <= 0) glitchRects.splice(i, 1);

  }


  if (frameCount % 60 === 0) {

    fill(grayMode ? 180 : color(random(255), random(255), random(255)));

    textSize(random(14, 26));

    text(random(voices), random(width), random(height));

  }


  if (random() < 0.015) {

    fill(255, 20);

    rect(0, 0, width, height);

  }


  // Movimiento rápido = glitch extra

  if (mouseSpeed > 40 && !collapseMode && !invisibleMode) {

    for (let i = 0; i < 15; i++) {

      let col = grayMode

        ? color(200)

        : color(random(255), random(255), random(255));

      glitchRects.push({

        x: random(width),

        y: random(height),

        w: random(20, 180),

        h: random(10, 90),

        col: col,

        decay: int(random(5, 15))

      });

    }

  }


  // S: NO SIGNAL

  if (collapseMode) {

    fill(255, 220);

    rect(0, 0, width, height);

    fill(0);

    textSize(48);

    textAlign(CENTER, CENTER);

    text("NO SIGNAL", width / 2, height / 2);

  }


  // V: Vigilancia activa

  if (surveillanceMode) {

    push();

    tint(random(255), random(255), random(255), 100);

    image(cam, 0, 0, width, height);

    pop();

    fill(255);

    textSize(24);

    textAlign(LEFT);

    text("USER IDENTIFIED", 20, height - 30);

  }


  // I: Invisibilidad

  if (invisibleMode) {

    let elapsed = millis() - invisibilityStartTime;

    let fade = map(elapsed, 0, 1500, 0, 255, true);

    fill(0, fade);

    rect(0, 0, width, height);


    if (fade >= 250) {

      fill(150);

      textAlign(CENTER, CENTER);

      textSize(20);

      text("YOU HAVE BEEN ERASED FROM VISION SYSTEMS", width / 2, height / 2);

      osc.amp(0, 2);

    }


    if (elapsed > 5000) {

      invisibleMode = false;

    }

  }


  // Sonido binario automático

  let now = millis();

  if (!collapseMode && !invisibleMode && now - lastInteractionTime > 5000 && now > binaryBipTimer) {

    osc.freq(random([440, 880, 1320]));

    osc.amp(0.1, 0.01);

    setTimeout(() => {

      osc.amp(0, 0.05);

    }, 100);


    binaryBipTimer = now + random(1000, 3000);

  }

}


function mousePressed() {

  userStartAudio();

  lastInteractionTime = millis();

  binaryBipTimer = millis() + random(3000, 6000);

  grayMode = true;


  for (let i = 0; i < 30; i++) {

    let g = random(80, 200);

    glitchRects.push({

      x: mouseX + random(-200, 200),

      y: mouseY + random(-200, 200),

      w: random(30, 200),

      h: random(10, 90),

      col: color(g),

      decay: int(random(10, 30))

    });

  }


  let freq = random([120, 180, 300, 440, 640]);

  osc.freq(freq);

  osc.amp(0.3, 0.05);

  setTimeout(() => {

    osc.amp(0, 0.2);

    grayMode = false;

  }, 300);

}


function keyPressed() {

  lastInteractionTime = millis();

  binaryBipTimer = millis() + random(3000, 6000);


  if (key === 'S') {

    collapseMode = true;

    osc.freq(60);

    osc.amp(0.5, 0.1);

    setTimeout(() => {

      collapseMode = false;

      osc.amp(0, 0.3);

    }, 1200);

  }


  if (key === 'V') {

    surveillanceMode = !surveillanceMode;

  }


  if (key === 'I') {

    invisibleMode = true;

    invisibilityStartTime = millis();

    osc.freq(40);

    osc.amp(0.2, 0.2);

  }

}


function updateMouseSpeed() {

  let dx = abs(mouseX - lastMouseX);

  let dy = abs(mouseY - lastMouseY);

  mouseSpeed = dx + dy;

  lastMouseX = mouseX;

  lastMouseY = mouseY;

}
