years = [];
data = [];
var continent = 'Asia'

function preload() {
  table = loadTable('total-number-of-people-aged-15-with-no-education-in-millions-by-continent-1970-2050.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1000, 800);

  // Get rows and columns information
  rows = table.getRows();
  numberOfRows = table.getRowCount();

  // Get all rows where the Continent is Asia
  for (var r = 0; r < numberOfRows; r++) {
    if (rows[r].arr[0] == continent) {
      data.push(rows[r].arr);
    }
  }

  getYears(data);

  noLoop();
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

function draw() {
  background(220);
  textAlign(CENTER);
  fill(0);

  textSize(20);
  text('Total Number of People Aged 15+ with \n No Education (in Millions) in Asia - 1970 to 2050', 500, 40);

  push();
  translate(40, 400);
  rotate(radians(-90));
  text('Number of People (Millions)', 0, 0);
  pop();

  text('Year', 525, 770);

  var colour = color(255, 153, 51);

  // Draw x-axis
  line(107, 700, 960, 700);
  for (var y in years) {
    textSize(15);
    fill(0);
    // line(y * 50 + 130, 700, y * 50 + 130, 100);
    text(years[y], y * 50 + 130, 730);
  }

  // Draw y-axis
  maxValue = getMaxPeopleNum(data)
  line(107, 100, 107, 700);
  for (var b = 0; b < maxValue + 50; b = b + 50) {
    textSize(15);
    fill(0);
    line(100, 700 - b, 107, 700 - b);
    text(b, 80, 700 - b);
  }

  // Draw key
  fill(255);
  rect(795, 80, 125, 80);
  fill(0);
  textSize(15);
  text('Key', 855, 100);
  text('=   Asia', 865, 130);
  fill(colour);
  stroke(colour);
  ellipse(820, 125, 15, 15);

  // Draw dots and lines
  for (var d = 0; d < data.length; d++) {
    stroke(colour);
    fill(colour);
    strokeWeight(3);
    ellipse(d * 50 + 130, 720 - data[d][2], 15, 15);
    if (data[d + 1][2] !== 'undefined') {
      line(d * 50 + 130, 720 - data[d][2], (d + 1) * 50 + 130, 720 - data[d + 1][2]);
    }
  }
}