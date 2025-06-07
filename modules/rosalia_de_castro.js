let letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("")
let palabras = [
  "transitar", "efímero", "presencia", "desaparición", "fragmento", "gesto",
  "archivo", "anonimato", "huella", "memoria", "acto", "silencio", "vacío",
  "intersticio", "suspensión", "ritmo", "latencia", "inestabilidad", "flujo",
  "borrado", "cuerpo", "situación", "residuo", "escucha", "latido", "resonancia",
  "desvío", "ocultamiento", "desequilibrio", "mínimo", "rastros", "invisibilidad",
  "apertura", "intervalo", "eco", "intención", "vulnerabilidad", "reversibilidad",
  "autonomía", "inserción", "interferencia", "modulación", "constelación",
  "coexistencia", "reiteración", "pliegue", "vacilación", "gestualidad", "disonancia"
]

let elementos = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  textFont('monospace')
  textAlign(CENTER, CENTER)
  noCursor()
}

function draw() {
  background(0, 25)

  for (let i = elementos.length - 1; i >= 0; i--) {
    let e = elementos[i]
    fill(255, e.alpha)
    textSize(e.size)
    text(e.texto, e.x, e.y)
    e.alpha -= 1.2
    if (e.alpha <= 0) {
      elementos.splice(i, 1)
    }
  }

  noFill()
  stroke(255, 50)
  ellipse(mouseX, mouseY, 20)
}

function mouseMoved() {
  let letra = random(letras)
  elementos.push({
    texto: letra,
    x: mouseX + random(-20, 20),
    y: mouseY + random(-20, 20),
    alpha: 255,
    size: random(14, 22)
  })
}

function mouseClicked() {
  for (let i = 0; i < 4; i++) {
    elementos.push({
      texto: random(palabras),
      x: random(width),
      y: random(height),
      alpha: 255,
      size: random(18, 28)
    })
  }
}