let data = [];
let currentKey = null;

function preload() {
  data = loadJSON("data.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
}

function draw() {
  background(0, 20);

  if (currentKey) {
    let props = data.find(entry => entry.key === currentKey);
    if (props) {
      fill(props.color[0], props.color[1], props.color[2], 150);

      for (let i = 0; i < 10; i++) {
        let x = random(width);
        let y = random(height);
        let s = props.size;

        if (props.shape === "circle") {
          ellipse(x, y, s);
        } else if (props.shape === "square") {
          rect(x, y, s, s);
        } else if (props.shape === "triangle") {
          triangle(x, y, x + s, y, x + s / 2, y - s);
        } else if (props.shape === "line") {
          stroke(props.color[0], props.color[1], props.color[2]);
          line(x, y, x + s, y + s);
          noStroke();
        }
        // Puedes añadir más formas personalizadas aquí según el JSON
      }
    }
  }
}

function keyPressed() {
  currentKey = key.toLowerCase();
}
