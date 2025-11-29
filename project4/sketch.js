// 프로젝트 4 - abstract_art_animated.js
// 과제 #1(abstract_art_600x400)을 기반으로 한 애니메이션 버전
// - 원본 레이어 구조/구도 유지
// - 시간에 따른 움직임(millis, sin, cos)
// - 색상 변화(colorMode, lerpColor, random 기반)
// - 크기 변화(삼각형/원 등)

// ---- 전역 데이터 ----
let bigCircles = [];   // 레이어1 큰 원들
let triangles = [];    // 레이어3 삼각형
let smallRects = [];   // 레이어6 작은 사각형들

const NUM_BIG = 6;
const NUM_TRI = 12;
const NUM_SMALL = 80;

function setup() {
  createCanvas(600, 400);
  frameRate(24);          // GIF 용량 줄이려면 18~20으로 내려도 됨
  rectMode(CORNER);
  colorMode(RGB, 255, 255, 255, 255);

  randomSeed(42); // 원본과 동일한 배치가 나오도록 고정

  // 레이어 1: 큰 반투명 원들 (원본 값 + 애니메이션용 위상)
  for (let i = 0; i < NUM_BIG; i++) {
    let x = map(i, 0, 5, -80, width + 80);
    let y = height * 0.35 + sin(i * 1.2) * 30;
    let size = 220 - i * 20;
    let col = {
      r: 255,
      g: 200 - i * 20,
      b: 180 + i * 10,
      a: 90
    };
    bigCircles.push({
      x,
      y,
      size,
      col,
      phase: random(TWO_PI)
    });
  }

  // 레이어 3: 삼각형 군집 (원본 랜덤을 한 번만 뽑아서 기억)
  for (let i = 0; i < NUM_TRI; i++) {
    let cx = random(40, width - 40);
    let cy = random(40, height - 120);
    let s = random(30, 90);
    let col = {
      r: random(80, 255),
      g: random(40, 200),
      b: random(80, 255),
      a: 200
    };
    triangles.push({
      cx,
      cy,
      s,
      col,
      phase: random(TWO_PI)
    });
  }

  // 레이어 6: 작은 점/사각형 (위치/크기/색 고정 + 애니메이션용 위상)
  for (let i = 0; i < NUM_SMALL; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(2, 8);
    let h = random(2, 8);
    let col = {
      r: random(200, 255),
      g: random(200, 255),
      b: random(200, 255),
      a: random(120, 255)
    };
    smallRects.push({
      x,
      y,
      w,
      h,
      col,
      phase: random(TWO_PI)
    });
  }
}

function draw() {
  let t = millis() * 0.001; // 초 단위 시간

  drawBackground(t);        // 원본 그라데이션 + 살짝 색 흔들기
  drawLayer1BigCircles(t);  // 큰 원들(살짝 떠다니고 색 흔들림)
  drawLayer2RectPattern(t); // 기하학 사각 패턴 (살짝 회전/색 변화)
  drawLayer3Triangles(t);   // 삼각형 크기/위치/색 약간 변함
  drawLayer4Arcs(t);        // 아크(호) 색상을 HSB+lerpColor로 변화
  drawLayer5Bezier(t);      // 하단 베지어 곡선 약하게 출렁
  drawLayer6SmallRects(t);  // 작은 사각형들이 천천히 흘러감
  drawFocusCircle(t);       // 가운데 포커스 원 숨쉬는 효과
}

// ----- 레이어별 함수 -----

// 레이어 0: 배경 그라데이션
function drawBackground(t) {
  // 원본: 20→120, 30→200, 60→240 의 세로 그라데이션
  // 여기에 시간에 따라 살짝 RGB를 흔들어줌
  for (let y = 0; y < height; y++) {
    let ty = map(y, 0, height, 0, 1);
    let r = lerp(20, 120, ty);
    let g = lerp(30, 200, ty);
    let b = lerp(60, 240, ty);

    let wobble = 8 * sin(t * 0.3 + y * 0.02);
    stroke(r + wobble * 0.4, g + wobble * 0.2, b + wobble * 0.6);
    line(0, y, width, y);
  }
  noStroke();
}

// 레이어 1: 큰 반투명 원들
function drawLayer1BigCircles(t) {
  noStroke();
  for (let c of bigCircles) {
    // 약한 상하 이동 + 크기 변화
    let dy = 8 * sin(t * 0.8 + c.phase);
    let scale = 1.0 + 0.08 * sin(t * 0.6 + c.phase);

    // 색상도 살짝 흔들리게
    let dr = 10 * sin(t * 0.5 + c.phase);
    let dg = 8 * cos(t * 0.4 + c.phase);
    let db = 6 * sin(t * 0.7 + c.phase);

    fill(
      c.col.r + dr,
      c.col.g + dg,
      c.col.b + db,
      c.col.a
    );
    ellipse(c.x, c.y + dy, c.size * scale, c.size * scale);
  }
}

// 레이어 2: 기하학적 사각 패턴
function drawLayer2RectPattern(t) {
  push();
  translate(width * 0.5, height * 0.6);

  for (let i = 0; i < 8; i++) {
    push();

    // 원본의 rotate(i * 12도) + 약간의 흔들림
    let baseAngle = radians(i * 12);
    let wobble = 0.05 * sin(t * 0.7 + i);
    rotate(baseAngle + wobble);

    // 색상 변화: HSB 모드로 살짝 hue 변화 후 RGB로 다시
    colorMode(HSB, 360, 100, 100, 255);
    let baseHue = map(i, 0, 7, 190, 260);
    let c1 = color(baseHue + 15 * sin(t * 0.5 + i), 40, 95, 200);
    let c2 = color(baseHue + 60, 30, 80, 200);
    let k = (sin(t * 0.9 + i) + 1) * 0.5;
    let cc = lerpColor(c1, c2, k);
    stroke(30, 10, 40, 180);
    strokeWeight(2);
    fill(cc);
    colorMode(RGB, 255, 255, 255, 255);

    rectMode(CENTER);
    let w = 360 - i * 30;
    let h = 90 - i * 6;
    rect(0, 0, w, h, 16);

    pop();
  }
  pop();
}

// 레이어 3: 삼각형 군집
function drawLayer3Triangles(t) {
  for (let tri of triangles) {
    let s = tri.s * (1.0 + 0.15 * sin(t * 1.3 + tri.phase)); // 크기 변화
    let shakeX = 4 * sin(t * 1.1 + tri.phase);
    let shakeY = 4 * cos(t * 0.9 + tri.phase);

    // 색을 두 가지 사이에서 lerp (HSB)
    colorMode(HSB, 360, 100, 100, 255);
    let baseHue = map(tri.col.r, 80, 255, 260, 330);
    let cA = color(baseHue, 70, 90, tri.col.a);
    let cB = color((baseHue + 40) % 360, 50, 70, tri.col.a);
    let k = (sin(t * 1.5 + tri.phase) + 1) * 0.5;
    let cc = lerpColor(cA, cB, k);
    stroke(0, 0, 0, 120);
    strokeWeight(1.2);
    fill(cc);
    colorMode(RGB, 255, 255, 255, 255);

    let cx = tri.cx + shakeX;
    let cy = tri.cy + shakeY;

    triangle(
      cx, cy - s * 0.6,
      cx - s * 0.8, cy + s * 0.6,
      cx + s * 0.8, cy + s * 0.6
    );
  }
}

// 레이어 4: 아크(호)와 선
function drawLayer4Arcs(t) {
  noFill();
  colorMode(HSB, 360, 100, 100, 255);

  for (let i = 0; i < 5; i++) {
    let x = map(i, 0, 4, 60, width - 60);
    let yBase = height * 0.2 + i * 18;
    let y = yBase + 5 * sin(t * 0.8 + i);

    let h1 = 40 + i * 15;
    let h2 = h1 + 35;
    let c1 = color(h1, 90, 100, 200);
    let c2 = color(h2, 70, 90, 200);
    let k = (sin(t * 1.1 + i * 0.5) + 1) * 0.5;
    let cc = lerpColor(c1, c2, k);

    stroke(cc);
    strokeWeight(3);
    arc(x, y, 140 - i * 12, 140 - i * 12, PI * 0.1, PI * 0.9);
  }

  colorMode(RGB, 255, 255, 255, 255);
}

// 레이어 5: 베지어 곡선
function drawLayer5Bezier(t) {
  noFill();
  stroke(255, 255, 255, 140);
  strokeWeight(2.2);

  let lift = 10 * sin(t * 0.7);

  beginShape();
  vertex(10, height - 20);
  bezierVertex(
    120, height - 120 + lift,
    480, height + 20 - lift,
    width - 10, height - 80
  );
  endShape();
}

// 레이어 6: 작은 점과 사각 포인트
function drawLayer6SmallRects(t) {
  noStroke();

  // HSB + lerpColor로 은근한 색 변화
  colorMode(HSB, 360, 100, 100, 255);

  for (let s of smallRects) {
    // 살짝 위로 흘러가는 느낌
    let yy = s.y + 12 * sin(t * 0.5 + s.phase);

    let baseHue = map(s.col.r, 200, 255, 190, 260);
    let cA = color(baseHue, 20, 100, s.col.a);
    let cB = color((baseHue + 40) % 360, 10 + 30 * random(), 95, s.col.a);
    let k = (sin(t * 1.3 + s.phase) + 1) * 0.5;
    let cc = lerpColor(cA, cB, k);

    fill(cc);
    rect(s.x, yy, s.w, s.h);
  }

  colorMode(RGB, 255, 255, 255, 255);
}

// 최종 포커스 원 (중앙)
function drawFocusCircle(t) {
  noStroke();
  let baseR = 120;
  let pulse = 10 * sin(t * 1.1);
  fill(10, 10, 30, 100 + 40 * (sin(t * 0.9) * 0.5 + 0.5));
  ellipse(width * 0.55, height * 0.45, baseR + pulse, baseR + pulse);
}

// ---- GIF 저장 ----
// p5.gif.js 라이브러리 추가해 놓은 상태에서
// 'g' 키를 누르면 10초짜리 GIF 저장
function keyPressed() {
  if (key === 'g' || key === 'G') {
    saveGif('abstract_art_animated', 10); // 10초
  }
  if (key === 's' || key === 'S') {
    // PNG 한 장 캡처도 가능하게 원본 기능 유지
    saveCanvas('abstract_art_600x400', 'png');
  }
}
