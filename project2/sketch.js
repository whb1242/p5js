function setup() {
  createCanvas(600, 400);
  background(255, 250, 240);
  noLoop();
}

function draw() {
  let centerX = width / 2;
  let centerY = height / 2;

  stroke(220);
  strokeWeight(2);
  fill(210, 230, 240);
  rectMode(CENTER);
  rect(centerX, centerY, 280, 360, 10);

  noStroke();

  // 옷
  fill(30, 80, 150);
  rect(centerX, centerY + 180, 180, 140, 5);

  fill(255);
  rect(centerX, centerY + 115, 100, 20, 5);

  fill(150);
  triangle(centerX, centerY + 110,
           centerX - 40, centerY + 130,
           centerX + 40, centerY + 130);

  // 목
  fill('#E0C8B0');
  rect(centerX, centerY + 100, 60, 30);

  // 얼굴
  fill('#FFE0C8');
  ellipse(centerX, centerY, 210, 240);

  // 머리
  fill(80, 40, 10);
  arc(centerX, centerY - 5, 220, 250, PI, TWO_PI, CHORD);

  ellipse(centerX - 80, centerY - 100, 70, 70);
  ellipse(centerX - 30, centerY - 125, 80, 80);
  ellipse(centerX + 40, centerY - 120, 75, 75);
  ellipse(centerX + 90, centerY - 90, 60, 60);
  ellipse(centerX + 110, centerY - 40, 50, 50);
  ellipse(centerX - 110, centerY - 45, 50, 50);

  fill(150, 100, 60);
  ellipse(centerX, centerY - 110, 60, 40);

  // 눈
  let eyeY = centerY - 10;

  fill(255);
  ellipse(centerX - 45, eyeY, 45, 35);
  fill(80, 120, 180);
  ellipse(centerX - 45, eyeY, 25, 25);
  fill(0);
  ellipse(centerX - 45, eyeY, 10, 10);
  fill(255);
  ellipse(centerX - 50, eyeY - 5, 8, 8);

  fill(255);
  ellipse(centerX + 45, eyeY, 45, 35);
  fill(80, 120, 180);
  ellipse(centerX + 45, eyeY, 25, 25);
  fill(0);
  ellipse(centerX + 45, eyeY, 10, 10);
  fill(255);
  ellipse(centerX + 40, eyeY - 5, 8, 8);

  // 눈썹
  fill(60, 30, 5);
  rect(centerX - 45, eyeY - 30, 40, 8, 3);
  rect(centerX + 45, eyeY - 30, 40, 8, 3);

  // 코
  stroke(200, 150, 120);
  strokeWeight(2);
  line(centerX, centerY + 10, centerX, centerY + 40);
  noFill();
  arc(centerX - 5, centerY + 40, 10, 5, PI, 0);

  // 주근깨
  noStroke();
  fill(160, 100, 60, 120);
  for (let i = 0; i < 30; i++) {
    let x = centerX + random(-60, 60);
    let y = centerY + 30 + random(-20, 20);
    ellipse(x, y, 2, 2);
  }

  // 입
  stroke(180, 80, 80);
  strokeWeight(2.5);
  noFill();
  line(centerX - 25, centerY + 75, centerX + 25, centerY + 75);

  // 모자
  fill(60, 90, 120);
  stroke(40, 60, 80);
  strokeWeight(2);
  rect(centerX, centerY - 140, 180, 50, 10);

  fill(255, 200, 0);
  noStroke();
  ellipse(centerX - 50, centerY - 140, 20, 20);
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('jam_caricature_final_with_clothes', 'png');
  }
}
