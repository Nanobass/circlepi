class Point2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function randomPoint() {
  return new Point2D(random(0, width), random(0, height));
}

function circleContains(c, r, p) {
  let dx = c.x - p.x;
  let dy = c.y - p.y;
  return dx * dx + dy * dy <= r * r;
}

let inside = 0;
let outside = 0;

let c;
let r;

let ppf = 10;
let ppfs;

let resetb;

let pauseb;
let pauses = true;

function setup() {
  let w = windowWidth - 20;
  let h = windowHeight - 70;

  let sz = min(w, h);

  createCanvas(sz, sz);
  resetf();

  ppfs = createSlider(1, 10000, 30, 1);
  ppfs.size(200, 40);
  resetb = createButton("reset");
  resetb.size(100, 40);
  resetb.mousePressed(resetf);

  pauseb = createButton("start");
  pauseb.size(100, 40);
  pauseb.mousePressed(function () {
    pauses = !pauses;
    pauseb.html(pauses ? "start" : "pause");
  });
}

function resetf() {
  background(0);
  c = new Point2D(width / 2, height / 2);
  r = width / 2;
  inside = 0;
  outside = 0;
}

function draw() {
  if (!pauses) {
    ppf = ppfs.value();
    for (let i = 0; i < ppf; i++) {
      let p = randomPoint();

      if (circleContains(c, r, p)) {
        inside++;
        stroke(0, 255, 0);
        fill(0, 255, 0);
      } else {
        outside++;
        stroke(0, 0, 255);
        fill(0, 0, 255);
      }

      if (i < 2500) point(p.x, p.y);
    }
  }

  fill(0);
  stroke(0);
  textSize(24);
  let rw = 340;
  let rh = 100;
  rect(width / 2 - rw / 2, height / 2 - rh / 2, rw, rh);
  fill(255);
  stroke(255);

  let pi = (inside / (inside + outside)) * 4;

  let xc = width / 2;
  let yc = height / 2 + 10;

  textc("𝜋ᵃᵖᵖʳᵒˣ=" + nf(pi, 1, 10), xc, yc - textSize());
  textc("   𝜋ʳᵉᵃˡ=" + nf(PI, 1, 10), xc, yc);
  textc(
    "      %ᵈᶦᶠᶠ=" + nf(abs(PI / pi - 1) * 100, 1, 10) + "%",
    xc,
    yc + textSize()
  );
}

function textc(t, x, y) {
  let w = textWidth(t);
  let h = textSize();
  noStroke();
  text(t, x - w / 2, y + h / w);
}
