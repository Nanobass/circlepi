let CircleGraphics;

let IterationSlider;
let ResetButton;
let StateButton;

let SimulationState = false;

let InsidePoints;
let OutsidePoints;
let TotalPoints;

let PIreal;
let PIapprox;
let Pdiff;
let MatchingDigits;

let NumberResolution = 10;

function SimulationReset() {
  InsidePoints = 0;
  OutsidePoints = 0;
  TotalPoints = 0;

  PIreal = PI;
  PIapprox = 0;
  Pdiff = 0;
  MatchingDigits = CalculateMatching(PIreal, PIapprox, 1, NumberResolution);

  CircleGraphics.background(0);
}

function SimulationStep(draw) {
  let x = random(-1, 1);
  let y = random(-1, 1);
  let i = PointInCircle(x, y);

  if (i) {
    InsidePoints++;
  } else {
    OutsidePoints++;
  }
  if (draw) {
    if (i) {
      CircleGraphics.stroke(0, 0, 255);
    } else {
      CircleGraphics.stroke(0, 255, 0);
    }
    CircleGraphics.point(
      x * (CircleGraphics.width / 2) + CircleGraphics.width / 2,
      y * (CircleGraphics.height / 2) + CircleGraphics.height / 2
    );
  }

  TotalPoints++;

  PIapprox = 4 * (InsidePoints / TotalPoints);
}

function setupUI() {
  IterationSlider = createSlider(0, 60000, 100, 1);
  IterationSlider.size(256, 48);

  ResetButton = createButton("RESET");
  ResetButton.size(96, 48);
  ResetButton.mousePressed(SimulationReset);

  StateButton = createButton("START");
  StateButton.size(96, 48);
  StateButton.mousePressed(function () {
    SimulationState = !SimulationState;
    StateButton.html(SimulationState ? "PAUSE" : "START");
  });

  CircleGraphics = createGraphics(width, height);
}

function setup() {
  let wWidth = windowWidth;
  let wHeight = windowHeight - 100;
  createCanvas(wWidth, wHeight);
  setupUI();
  SimulationReset();
}

function draw() {
  background(0);

  if (SimulationState)
    for (let i = 0; i < IterationSlider.value(); i++) {
      SimulationStep(i < 500);
    }

  image(CircleGraphics, 0, 0);

  textSize(34);

  MatchingDigits = CalculateMatching(PIreal, PIapprox, 1, NumberResolution);
  
  let r = 20;
  let r0 = r + 1 * textSize();
  let r1 = r + 2 * textSize();
  let r2 = r + 3 * textSize();
  let r3 = r + 4 * textSize();

  let c = 40;
  let c0 = c;
  let c1 = c + 200;
  let c2 = c + 250;
  
  let gray = color(0,0,0,127);
  fill(gray);
  rect(c-10,r,c+440+10,r3);

  let green = color(0, 255, 0);
  let red = color(255, 0, 0);
  let white = color(255, 255, 255);

  let sPIapprox = nf(PIapprox, 1, NumberResolution);
  SingleColorText("𝜋", c0, r0, white);
  SplitColorText(sPIapprox, c2, r0, MatchingDigits, green, red);
  SingleColorText("≈", c1, r0, white);

  let sPIreal = nf(PIreal, 1, NumberResolution);
  SingleColorText("𝜋", c0, r1, white);
  SingleColorText(sPIreal, c2, r1, white);
  SingleColorText("=", c1, r1, white);

  let sInside = "" + InsidePoints;
  SingleColorText("Kreis", c0, r2, white);
  SingleColorText(sInside, c2, r2, white);
  SingleColorText("=", c1, r2, white);

  let sTotal = "" + TotalPoints;
  SingleColorText("Rechteck", c0, r3, white);
  SingleColorText(sTotal, c2, r3, white);
  SingleColorText("=", c1, r3, white);
}

function PointInCircle(x, y) {
  return x * x + y * y < 1;
}

function CalculateMatching(n1, n2, left, right) {
  let s1 = nf(n1, left, right);
  let s2 = nf(n2, left, right);
  let matching = 0;
  for (let i = 0; i < left + 1 + right; i++) {
    if (s1[i] != s2[i]) break;
    matching++;
  }
  return matching;
}

function SingleColorText(str, x, y, c) {
  noStroke();
  fill(c);
  text(str, x, y);
}

function SplitColorText(str, x, y, split, c1, c2) {
  let Points = TextToXPoints(str);
  noStroke();
  for (let i = 0; i < Points.length; i++) {
    if (i < split) {
      fill(c1);
    } else {
      fill(c2);
    }
    text(str[i], x + Points[i], y);
  }
}

function TextToXPoints(text) {
  let Points = [];
  let x = 0;
  for (let i = 0; i < text.length; i++) {
    w = textWidth(text[i]);
    Points.push(x);
    x += w;
  }
  return Points;
}
