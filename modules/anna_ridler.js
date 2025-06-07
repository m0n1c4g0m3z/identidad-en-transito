let trazos = []
let ruido = 0
let frameGlitch = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  strokeWeight(1.5)
  noFill()
}

function draw() {
  background(0, 20)
  ruido += 0.01

  for (let i = 0; i < trazos.length; i++) {
    trazos[i].actualiza()
    trazos[i].muestra()
  }

  if (random(1) < 0.03) {
    trazos.push(new Trazo(mouseX, mouseY))
  }

  if (frameGlitch > 0) {
    glitchVisual()
    frameGlitch--
  }
}

function mousePressed() {
  frameGlitch = 30
  for (let i = 0; i < trazos.length; i++) {
    trazos[i].dispersa()
  }
}

class Trazo {
  constructor(x, y) {
    this.puntos = []
    this.baseX = x
    this.baseY = y
    for (let i = 0; i < 8; i++) {
      this.puntos.push(createVector(x, y))
    }
    this.offset = random(1000)
    this.tiempo = 0
  }

  actualiza() {
    this.tiempo += 0.02
    for (let i = 0; i < this.puntos.length; i++) {
      let ang = noise(this.offset + this.tiempo + i * 0.1) * TWO_PI * 2
      let r = sin(this.tiempo + i * 0.2) * 20 + 40
      this.puntos[i].x = this.baseX + cos(ang) * r
      this.puntos[i].y = this.baseY + sin(ang) * r
    }
  }

  muestra() {
    stroke(255, 100)
    beginShape()
    for (let v of this.puntos) {
      curveVertex(v.x, v.y)
    }
    endShape(CLOSE)
  }

  dispersa() {
    this.offset += random(100)
  }
}

function glitchVisual() {
  stroke(255, 0, 0, 100)
  for (let i = 0; i < 10; i++) {
    let y = random(height)
    line(0, y, width, y + sin(frameCount * 0.1) * 30)
  }
}
