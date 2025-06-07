let osc, env, reverb, fft;
let scale, scales;
let currentScale = 0;
let notes = [];

let numLines = 60;
let spacing;
let wave;
let mouseMovedRecently = false;
let lastMoveTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noFill();
  stroke(255, 15);

  spacing = height / numLines;

  // Escalas ambiguas y suaves
  scales = [
    [0, 2, 5, 7, 10],  // pentatónica
    [0, 1, 4, 6, 9],   // misteriosa
    [0, 3, 7, 8],      // ambigua
  ];
  scale = scales[currentScale];
  updateNotes();

  // Sintetizador
  osc = new p5.Oscillator('sine');
  osc.start();
  osc.amp(0);

  env = new p5.Envelope();
  env.setADSR(0.01, 0.3, 0.1, 2.5);
  env.setRange(0.2, 0);

  reverb = new p5.Reverb();
  reverb.process(osc, 6, 4);

  fft = new p5.FFT();
  fft.setInput(osc);
}

function draw() {
  background(0, 20); // niebla sutil

  wave = fft.waveform();

  // LÍNEAS REACTIVAS A LA ONDA
  for (let i = 0; i < numLines; i++) {
    let y = i * spacing + spacing / 2;
    beginShape();
    for (let x = 0; x < width; x += 10) {
      let index = floor(map(x, 0, width, 0, wave.length));
      let offset = wave[index] * spacing * 2;
      curveVertex(x, y + offset);
    }
    endShape();
  }

  // Reproducir nota si se ha movido el mouse recientemente
  if (mouseMovedRecently && millis() - lastMoveTime > 200) {
    playNoteFromMouse();
    mouseMovedRecently = false;
  }
}

function playNoteFromMouse() {
  let idx = floor(map(mouseX, 0, width, 0, notes.length));
  idx = constrain(idx, 0, notes.length - 1);
  let freq = notes[idx];
  osc.freq(freq);
  env.play(osc);
}

function updateNotes() {
  notes = scale.map(i => midiToFreq(48 + i)); // escala grave y envolvente
}

function mousePressed() {
  // Cambiar escala
  currentScale = (currentScale + 1) % scales.length;
  scale = scales[currentScale];
  updateNotes();
}

function mouseMoved() {
  // Marcar que el mouse se ha movido para disparar sonido
  mouseMovedRecently = true;
  lastMoveTime = millis();
}