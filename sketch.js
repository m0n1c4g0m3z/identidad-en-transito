let data;
let currentKey = null;

function preload() {
  // Cargar el JSON con la información de las autoras
  data = loadJSON("data.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
}

function draw() {
  background(0, 20); // Fondo negro con leve transparencia para efecto trazo

  if (currentKey && data[currentKey]) {
    let props = data[currentKey];
    fill(props.color[0], props.color[1], props.color[2], 150);

    for (let i = 0; i < props.count; i++) {
      let x = random(width);
      let y = random(height);
      let s = random(props.size[0], props.size[1]);

      // Según la forma
      if (props.form === "circle") {
        ellipse(x, y, s);
      } else if (props.form === "square") {
        rect(x, y, s, s);
      } else if (props.form === "triangle") {
        triangle(x, y, x + s, y, x + s / 2, y - s);
      } else if (props.form === "line") {
        stroke(props.color[0], props.color[1], props.color[2]);
        line(x, y, x + s, y + s);
        noStroke();
      }
      // Puedes seguir añadiendo más formas si lo necesitas
    }
  }
}

function keyPressed() {
  let entry = findAuthorByKey(key.toLowerCase());
  if (entry) {
    currentEntry = entry;
  }
}
