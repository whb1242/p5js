function setup() {
  createCanvas(600, 400);
  noLoop();
  randomSeed(42);

  // 부드러운 배경 그라데이션
  for (let y = 0; y < height; y++) {
    let t = map(y, 0, height, 0, 1);
    let r = lerp(20, 120, t);
    let g = lerp(30, 200, t);
    let b = lerp(60, 240, t);
    stroke(r, g, b);
    line(0, y, width, y);
  }

  // 레이어 1: 큰 반투명 원들
  noStroke();
  for (let i = 0; i < 6; i++) {
    let x = map(i, 0, 5, -80, width + 80);
    let y = height * 0.35 + sin(i * 1.2) * 30;
    fill(255, 200 - i * 20, 180 + i * 10, 90);
    ellipse(x, y, 220 - i * 20, 220 - i * 20);
  }

  // 레이어 2: 기하학적 사각 패턴
  push();
  translate(width * 0.5, height * 0.6);
  for (let i = 0; i < 8; i++) {
    push();
    rotate(radians(i * 12));
    stroke(30, 10, 40, 180);
    strokeWeight(2);
    fill(200 - i * 15, 230 - i * 10, 250, 160);
    rectMode(CENTER);
    rect(0, 0, 360 - i * 30, 90 - i * 6, 16);
    pop();
  }
  pop();

  // 레이어 3: 삼각형 군집
  for (let i = 0; i < 12; i++) {
    let cx = random(40, width - 40);
    let cy = random(40, height - 120);
    let s = random(30, 90);
    stroke(0, 0, 0, 120);
    strokeWeight(1);
    fill(random(80, 255), random(40, 200), random(80, 255), 200);
    triangle(cx, cy - s * 0.6, cx - s * 0.8, cy + s * 0.6, cx + s * 0.8, cy + s * 0.6);
  }

  // 레이어 4: 아크(호)
  for (let i = 0; i < 5; i++) {
    let x = map(i, 0, 4, 60, width - 60);
    let y = height * 0.2 + i * 18;
    strokeWeight(3);
    noFill();
    stroke(255, 240 - i * 30, 90 + i * 30, 200);
    arc(x, y, 140 - i * 12, 140 - i * 12, PI * 0.1, PI * 0.9);
  }

  // 레이어 5: 베지어 곡선
  noFill();
  stroke(255, 255, 255, 140);
  strokeWeight(2.2);
  beginShape();
  vertex(10, height - 20);
  bezierVertex(120, height - 120, 480, height + 20, width - 10, height - 80);
  endShape();

  // 레이어 6: 작은 사각형들
  for (let i = 0; i < 80; i++) {
    let x = random(width);
    let y = random(height);
    noStroke();
    fill(random(200, 255), random(200, 255), random(200, 255), random(120, 255));
    rect(x, y, random(2, 8), random(2, 8));
  }

  // 마지막 포커스 원
  noStroke();
  fill(10, 10, 30, 100);
  ellipse(width * 0.55, height * 0.45, 120, 120);

  // 자동 저장
  setTimeout(() => saveCanvas('abstract_art_600x400', 'png'), 500);
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('abstract_art_600x400', 'png');
  }
}
