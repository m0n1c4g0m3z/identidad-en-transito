{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 let data;\
let currentKey = null;\
\
function preload() \{\
  // Cargar el JSON con la informaci\'f3n de las autoras\
  data = loadJSON("data.json");\
\}\
\
function setup() \{\
  createCanvas(windowWidth, windowHeight);\
  background(0);\
  noStroke();\
\}\
\
function draw() \{\
  background(0, 20); // Fondo negro con leve transparencia para efecto trazo\
\
  if (currentKey && data[currentKey]) \{\
    let props = data[currentKey];\
    fill(props.color[0], props.color[1], props.color[2], 150);\
\
    for (let i = 0; i < 10; i++) \{\
      let x = random(width);\
      let y = random(height);\
      let s = props.size;\
\
      // Seg\'fan la forma\
      if (props.shape === "circle") \{\
        ellipse(x, y, s);\
      \} else if (props.shape === "square") \{\
        rect(x, y, s, s);\
      \} else if (props.shape === "triangle") \{\
        triangle(x, y, x + s, y, x + s / 2, y - s);\
      \} else if (props.shape === "line") \{\
        stroke(props.color[0], props.color[1], props.color[2]);\
        line(x, y, x + s, y + s);\
        noStroke();\
      \}\
      // Puedes a\'f1adir m\'e1s formas personalizadas aqu\'ed si las defines en el JSON\
    \}\
  \}\
\}\
\
function keyPressed() \{\
  let keyLower = key.toLowerCase(); // convierte la tecla a min\'fascula\
  if (data[keyLower]) \{\
    currentKey = keyLower;\
  \}\
\}}