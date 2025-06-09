JSONObject autoras;
String teclaActual = "";
int cantidad = 0;
color formaColor;
String forma = "";

void setup() {
  size(800, 600);
  background(0);
  autoras = loadJSONObject("data.json");
}

void draw() {
  background(0);  // Fondo negro mate cada frame

  if (teclaActual != "") {
    JSONObject autora = autoras.getJSONObject(teclaActual);
    cantidad = autora.getInt("cantidad");
    formaColor = color(autora.getJSONArray("color").getInt(0),
                       autora.getJSONArray("color").getInt(1),
                       autora.getJSONArray("color").getInt(2));
    forma = autora.getString("forma");

    fill(formaColor);
    noStroke();

    for (int i = 0; i < cantidad; i++) {
      float x = random(width);
      float y = random(height);
      float s = random(20, 60);

      if (forma.equals("circle")) {
        ellipse(x, y, s, s);
      } else if (forma.equals("rect")) {
        rect(x, y, s, s);
      } else if (forma.equals("triangle")) {
        triangle(x, y, x + s, y, x + s/2, y - s);
      }
    }
  }
}

void keyPressed() {
  if (key >= 'a' && key <= 'm') {
    teclaActual = str(key);
  }
}
