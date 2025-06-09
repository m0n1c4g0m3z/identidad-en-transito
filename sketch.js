let data;
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

  if (currentKey && data[currentKey]) {
    let props = data[currentKey];
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
      } else if (props.shape === "ellipse") {
        ellipse(x, y, s * 1.5, s);
      } else if (props.shape === "arc") {
        arc(x, y, s, s, 0, PI + QUARTER_PI, PIE);
      } else if (props.shape === "star") {
        drawStar(x, y, s / 2, s, 5);
      } else if (props.shape === "cross") {
        rect(x - s / 8, y, s / 4, s);
        rect(x, y - s / 8, s, s / 4);
      } else if (props.shape === "wave") {
        beginShape();
        for (let i = 0; i < s; i += 5) {
          vertex(x + i, y + sin((x + i) * 0.05) * 10);
        }
        endShape();
      } else if (props.shape === "spiral") {
        noFill();
        beginShape();
        for (let angle = 0; angle < TWO_PI * 3; angle += 0.1) {
          let r = s * angle / (TWO_PI * 3);
          let sx = x + r * cos(angle);
          let sy = y + r * sin(angle);
          vertex(sx, sy);
        }
        endShape();
      } else if (props.shape === "dot") {
        ellipse(x, y, 5);
      } else if (props.shape === "blob") {
        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.2) {
          let r = s + random(-10, 10);
          let bx = x + r * cos(a);
          let by = y + r * sin(a);
          vertex(bx, by);
        }
        endShape(CLOSE);
      } else if (props.shape === "hexagon") {
        drawPolygon(x, y, s / 2, 6);
      }
    }
  }
}

function keyPressed() {
  let keyLower = key.toLowerCase();
  if (data[keyLower]) {
    currentKey = keyLower;
  }
}

function drawPolygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
