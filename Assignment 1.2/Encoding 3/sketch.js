data = [];
continents = [];
years = [];

function preload() {
  table = loadTable('total-number-of-people-aged-15-with-no-education-in-millions-by-continent-1970-2050.csv', 'csv', 'header');
}

function setup() {
  // Window Size
  createCanvas(1300, 800);

  // Get rows from Table
  rows = table.getRows();
  numberOfRows = table.getRowCount();

  // Add rows to 'data' array
  for (var r = 0; r < numberOfRows; r++) {
    data.push(rows[r].arr);
  }

  getContinents(data);
  getYears(data);

  noLoop();
}

function getContinents(data) {
  for (var i = 0; i < data.length; i++) {
    if (!continents.includes(data[i][0])) {
      continents.push(data[i][0]);
    }
  }
}

function getYears(data) {
  for (var i = 0; i < data.length; i++) {
    if (!years.includes(data[i][1])) {
      years.push(data[i][1]);
    }
  }
}

function getMaxPeopleNum(data) {

  var maxPeople = 0.0;
  for (var i = 0; i < data.length; i++) {
    if (float(data[i][2]) > maxPeople) {
      maxPeople = float(data[i][2]);
    }
  }
  return maxPeople;
}

function star(x, y, radius1, radius2, npoints) {
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

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function draw() {
  background(220);
  textAlign(CENTER);
  fill(0);

  textSize(18);
  text('Total Number of People Aged 15+ with \n No Education (in Millions) by Continent - 1970 to 2050', 650, 30);

  push();
  translate(30, 380);
  rotate(radians(-90));
  text('Number of People (Millions)', 0, 0);
  pop();

  text('Year', 675, 785);

  // Draw x-axis
  for (var y in years) {
    textSize(15);
    fill(0);
    // line(y * 70 + 130, 700, y * 70 + 130, 100);
    text(years[y], y * 70 + 130, 750);
  }

  // Draw y-axis
  maxValue = getMaxPeopleNum(data)
  line(97, 100, 97, 720);
  line(97, 720, 1275, 720);
  for (var b = 0; b < maxValue + 50; b = b + 50) {
    textSize(15);
    fill(0);
    line(90, 700 - b, 97, 700 - b);
    text(b, 60, 700 - b);
  }

  // Draw Shapes
  for (var d = 0; d < data.length; d++) {
    // Africa = Square
    if (data[d][0] == continents[0]) {
      rect(d * 70 + 125, 700 - data[d][2], 10, 10);
    }
    // Asia = Ellipse
    if (data[d][0] == continents[1]) {
      ellipse(d * 70 - 1060, 700 - data[d][2], 10, 10);
    }
    // Europe = Triangle
    if (data[d][0] == continents[2]) {
      triangle(d * 70 - 2245, 700 - data[d][2], d * 70 - 2255, 700 - data[d][2], d * 70 - 2250, 700 - data[d][2] - 10);
    }
    // N.America = Star
    if (data[d][0] == continents[3]) {
      push();
      translate(d * 70 - 3440, 700 - data[d][2]);
      star(0, 0, 3, 7, 5);
      pop();
    }
    // Oceania = Arc
    if (data[d][0] == continents[4]) {
      arc(d * 70 - 4630, 700 - data[d][2], 10, 10, PI, TWO_PI);
    }
    // S.America = Pentagon
    if (data[d][0] == continents[5]) {
      push();
      translate(d * 70 - 5820, 700 - data[d][2]-2);
      polygon(0, 0, 6, 5);
      pop();
    }
  }

  fill(255);
  // Draw key
  rect(1080, 80, 200, 220);
  fill(0);
  textSize(18);
  textAlign(LEFT);
  text('Key', 1155, 100);
  textSize(17);
  // Africa
  text('=   Africa', 1125, 130);
  rect(1105, 120, 10, 10);
  // Asia
  text('=   Asia', 1125, 160);
  ellipse(1110, 155, 10, 10);
  // Europe
  text('=   Europe', 1125, 190);
  triangle(1105, 190, 1115, 190, 1110, 180);
  // N.America
  text('=   North America', 1125, 220);
  push();
  translate(1110, 215);
  star(0, 0, 3, 7, 5);
  pop();
  // Oceania
  text('=   Oceania', 1125, 250);
  arc(1110, 248, 10, 10, PI, TWO_PI);
  // S.America
  text('=   South America', 1125, 280);
  push();
  translate(1110, 274);
  polygon(0, 0, 6, 5);
  pop();

}