let img;
let piezas = [];
let seleccionada = null;
let filas = 3;
let columnas = 3;
let mostrarCompleta = false;
let tiempoInactivo = 0;
let tiempoLimite = 1200; // 20 segundos a 60 FPS

let imgW, imgH;
let offsetX, offsetY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CORNER);
  createFileInput(cargarImagen).position(10, 10);
}

function cargarImagen(file) {
  if (file.type === 'image') {
    loadImage(file.data, (loadedImg) => {
      img = loadedImg;

      imgW = width * 0.7;
      imgH = height * 0.7;
      img.resize(imgW, imgH);
      offsetX = (width - imgW) / 2;
      offsetY = (height - imgH) / 2;

      prepararPiezas();
      tiempoInactivo = 0;
    });
  }
}

function prepararPiezas() {
  piezas = [];
  let w = imgW / columnas;
  let h = imgH / filas;

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      let g = createGraphics(w, h);
      g.image(img, -x * w, -y * h, imgW, imgH);
      piezas.push({
        x: random(width),
        y: random(height),
        w: w,
        h: h,
        g: g
      });
    }
  }
}

function draw() {
  background(0);

  if (mostrarCompleta && img) {
    image(img, offsetX, offsetY, imgW, imgH);
  } else {
    for (let p of piezas) {
      if (p !== seleccionada) {
        image(p.g, p.x, p.y);
      }
    }
    if (seleccionada) {
      image(seleccionada.g, mouseX - seleccionada.w / 2, mouseY - seleccionada.h / 2);
    }
  }

  if (img) {
    tiempoInactivo++;
    if (tiempoInactivo > tiempoLimite) {
      img = null;
      piezas = [];
    }
  }
}

function mousePressed() {
  if (!img) return;
  tiempoInactivo = 0;

  for (let i = piezas.length - 1; i >= 0; i--) {
    let p = piezas[i];
    if (
      mouseX > p.x && mouseX < p.x + p.w &&
      mouseY > p.y && mouseY < p.y + p.h
    ) {
      seleccionada = p;
      piezas.splice(i, 1);
      break;
    }
  }
}

function mouseReleased() {
  if (seleccionada) {
    seleccionada.x = mouseX - seleccionada.w / 2;
    seleccionada.y = mouseY - seleccionada.h / 2;
    piezas.push(seleccionada);
    seleccionada = null;
  }
}

function mouseMoved() {
  tiempoInactivo = 0;
}

function keyPressed() {
  tiempoInactivo = 0;
}