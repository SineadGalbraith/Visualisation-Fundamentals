data = [];
continents = [];
years = [];

function preload() {
  table = loadTable('total-number-of-people-aged-15-with-no-education-in-millions-by-continent-1970-2050.csv', 'csv', 'header');
}

function setup() {
  // Window Size
  createCanvas(1350, 800);

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
  text('Total Number of People Aged 15+ with \n No Education (in Millions) by Continent - 1970 to 2050', 700, 30);

  push();
  translate(30, 400);
  rotate(radians(-90));
  text('Number of People (Millions)', 0, 0);
  pop();

  text('Year', 700, 785);

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
  for (var d = 1; d <= data.length; d++) {
    if (data[d] !== undefined) {
      if (data[d][0] == continents[0]) {
        strokeWeight(15);
        line(((d - 1) * 70 + 125), 700 - data[d - 1][2], d * 70 + 125, 700 - data[d][2]);
      }
      if (data[d][0] == continents[1]) {
        strokeWeight(12);
        if (data[d - 1][0] !== continents[0]) {
          line(((d - 1) * 70 - 1060), 700 - data[d - 1][2], d * 70 - 1060, 700 - data[d][2]);
        } 
      }
      if (data[d][0] == continents[2]) {
        strokeWeight(9);
        if (data[d - 1][0] !== continents[1]) {
          line(((d - 1) * 70 - 2245), 700 - data[d - 1][2], d * 70 - 2245, 700 - data[d][2]);
        }
      }
      if (data[d][0] == continents[3]) {
        strokeWeight(6);
        if (data[d - 1][0] !== continents[2]) {
          line(((d - 1) * 70 - 3440), 700 - data[d - 1][2], d * 70 - 3440, 700 - data[d][2]);
        }
      }
      if (data[d][0] == continents[4]) {
        strokeWeight(3);
        if (data[d - 1][0] !== continents[3]) {
          line(((d - 1) * 70 - 4630), 700 - data[d - 1][2], d * 70 - 4630, 700 - data[d][2]);
        } 
      }
      if (data[d][0] == continents[5]) {
        strokeWeight(1);
        if (data[d - 1][0] !== continents[4]) {
          line(((d - 1) * 70 - 5820), 700 - data[d - 1][2], d * 70 - 5820, 700 - data[d][2]);
        }      
      }
    }
  }
  
  // Draw key
  fill(255);
  rect(1110, 80, 220, 220);
  fill(0);
  textSize(18);
  text('Key', 1220, 100);
  textAlign(LEFT);
  // Africa
  text('Africa', 1200, 135);
  strokeWeight(15);
  line(1130, 130, 1170, 130);
  // Asia
  text('Asia', 1200, 165);
  strokeWeight(12);
  line(1130, 160, 1170, 160);
  // Europe
  text('Europe', 1200, 195);
  strokeWeight(9);
  line(1130, 190, 1170, 190);
  // North America
  text('North America', 1200, 225);
  strokeWeight(6);
  line(1130, 220, 1170, 220);
  // Oceania
  text('Oceania', 1200, 255);
  strokeWeight(3);
  line(1130, 250, 1170, 250);
  // rect(1110, 250, 3, 3);
  // South America
  text('South America', 1200, 285);
  strokeWeight(1);
  line(1130, 280, 1170, 280);
}