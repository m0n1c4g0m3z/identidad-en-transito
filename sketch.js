let data = [];
let currentKey = null;

function preload() {
  data = loadJSON("data.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  angleMode(DEGREES);
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

        switch (props.shape) {
          case "circle":
            ellipse(x, y, s);
            break;
          case "square":
            rect(x, y, s, s);
            break;
          case "triangle":
            triangle(x, y, x + s, y, x + s / 2, y - s);
            break;
          case "line":
            stroke(props.color[0], props.color[1], props.color[2]);
            line(x, y, x + s, y + s);
            noStroke();
            break;
          case "dot":
            ellipse(x, y, s / 4);
            break;
          case "hexagon":
            drawPolygon(x, y, s / 2, 6);
            break;
          case "star":
            drawStar(x, y, s / 4, s / 2, 5);
            break;
          case "cross":
            rect(x - s / 4, y - s / 8, s / 2, s / 4);
            rect(x - s / 8, y - s / 4, s / 4, s / 2);
            break;
          case "wave":
            for (let a = 0; a < 360; a += 60) {
              ellipse(x + sin(a) * s / 2, y + cos(a) * s / 2, 5);
            }
            break;
          case "spiral":
            beginShape();
            for (let t = 0; t < s * 2; t += 5) {
              let angle = 0.1 * t;
              let x1 = x + (1 + angle) * cos(angle);
              let y1 = y + (1 + angle) * sin(angle);
              vertex(x1, y1);
            }
            endShape();
            break;
          case "blob":
            beginShape();
            for (let a = 0; a < 360; a += 45) {
              let r = s / 2 + random(-10, 10);
              let x1 = x + cos(a) * r;
              let y1 = y + sin(a) * r;
              curveVertex(x1, y1);
            }
            endShape(CLOSE);
            break;
          case "arc":
            arc(x, y, s, s, 0, 180);
            break;
          case "ellipse":
            ellipse(x, y, s, s / 2);
            break;
        }
      }
    }
  }
}

function keyPressed() {
  currentKey = key.toLowerCase();
}

function drawPolygon(x, y, radius, npoints) {
  let angle = 360 / npoints;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = 360 / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
