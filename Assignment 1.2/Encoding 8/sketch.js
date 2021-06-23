years = [];
data = [];
continents = [];
var maxNum = 0;

function preload() {
  table = loadTable('total-number-of-people-aged-15-with-no-education-in-millions-by-continent-1970-2050.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1300, 500);

  // Get rows and columns information
  rows = table.getRows();
  numberOfRows = table.getRowCount();

  for (var r = 0; r < numberOfRows; r++) {
    data.push(rows[r].arr);
  }

  getYears(data);
  getContinents(data);
  maxNum = getMaxPeopleNum(data);
  noLoop();
}

function getYears(data) {
  for (var i = 0; i < data.length; i++) {
    if (!years.includes(data[i][1])) {
      years.push(data[i][1]);
    }
  }
}

function getContinents(data) {
  for (var i = 0; i < data.length; i++) {
    if (!continents.includes(data[i][0])) {
      continents.push(data[i][0]);
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

function draw() {
  background(220);
  textAlign(CENTER);
  fill(0);

  textSize(20);
  text('Total Number of People Aged 15+ with \n No Education (in Millions) by Continent - 1970 to 2050', 650, 40);

  push();
  translate(40, 270);
  rotate(radians(-90));
  text('Entity (Continent)', 0, 0);
  pop();

  text('Year', 600, 480);

  var colour = color(255, 153, 51);

  // Draw x-axis
  line(185, 430, 1030, 430);
  for (var y in years) {
    textSize(15);
    fill(0);
    // line(y * 50 + 210, 430, y * 50 + 210, 130);
    text(years[y], y * 50 + 210, 450);
  }

  // Draw y-axis
  line(185, 160, 185, 6 * 50 + 130);
  for (var c = 0; c < continents.length; c++) {
    textAlign(RIGHT);
    textSize(15);
    fill(0);
    // line(176, c * 50 + 130, 185,  c * 50 + 130);
    line(176, c * 50 + 160, 185, c * 50 + 160);
    text(continents[c], 165, c * 50 + 163);
  }

  // Draw squares
  for (var ye = 0; ye < years.length; ye++) {
    for (var co = 0; co < continents.length; co++) {
      for (var d = 0; d < data.length; d++) {
        if (data[d][0] == continents[co] && data[d][1] == years[ye]) {
          rectMode(CENTER);
          var dim = ((data[d][2] / maxNum) * 15);
          dim += 1;
          rect(ye * 50 + 210, co * 50 + 160, dim, dim);
        }
      }
    }
  }

  // Draw key
  fill(255);
  rectMode(CORNER);
  rect(1080, 80, 190, 220);
  fill(0);
  textSize(18);
  text('Key', 1190, 100);
  rectMode(CENTER);
  textAlign(LEFT);
  rect(1110, 130, 15, 15);
  text('> 500 (millions)', 1130, 135);
  rect(1110, 160, 12, 12);
  text('400 (millions)', 1130, 165);
  rect(1110, 190, 9, 9);
  text('300 (millions)', 1130, 195);
  rect(1110, 220, 7, 7);
  text('200 (millions)', 1130, 225);
  rect(1110, 250, 3, 3);
  text('100 (millions)', 1130, 255);
  rect(1110, 280, 1.15, 1.15);
  text(' < 100 (millions)', 1130, 285);
  
}