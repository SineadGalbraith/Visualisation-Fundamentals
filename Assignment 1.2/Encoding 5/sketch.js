data = [];
continents = [];
years = [];
var africaTex, asiaTex, europeTex, nAmericaTex, oceaniaTex, sAmericaTex, fontRegular;

function preload() {
  table = loadTable('total-number-of-people-aged-15-with-no-education-in-millions-by-continent-1970-2050.csv', 'csv', 'header');
  africaTex = loadImage('AfricaTexture.jpg');
  asiaTex  = loadImage('AsiaTexture.jpg');
  europeTex = loadImage('EuropeTexture.jpg');
  nAmericaTex = loadImage('NorthAmericaTexture.jpg');
  oceaniaTex = loadImage('OceaniaTexture.jpg');
  sAmericaTex = loadImage('SouthAmericaTexture.jpg');
  fontRegular = loadFont('abel-regular.ttf');
}

function setup() {
  createCanvas(2800, 2500, WEBGL);

  // Get rows from Table
  rows = table.getRows();
  numberOfRows = table.getRowCount();

  // Add rows to 'data' array
  for (var r = 0; r < numberOfRows; r++) {
    data.push(rows[r].arr);
  }

  textFont(fontRegular);
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

function findMaxPeopleNum(data) {

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

  textSize(25);
  text('Total Number of People Aged 15+ with \n No Education (in Millions) by Continent - 1970 to 2050', 700, 200);

  push();
  translate(15, 570);
  rotate(radians(-90));
  text('Number of People (Millions)', 0, 0);
  pop();

  text('Year', 700, 1015);

  // Draw x-axis
  for (var y in years) {
    textSize(20);
    fill(0);
    // line(y * 70 + 130, 950, y * 70 + 130, 300);
    text(years[y], y * 70 + 130, 980);
  }

  // Draw y-axis
  maxValue = findMaxPeopleNum(data);
  line(97, 300, 97, 950);
  line(97, 950, 1275, 950);
  for (var b = 0; b < maxValue + 50; b = b + 50) {
    textSize(20);
    fill(0);
    line(90, 900 - b, 97, 900 - b);
    text(b, 60, 900 - b);
  }

  // Draw Shapes
  for (var d = 0; d < data.length; d++) {
    // Africa
    if (data[d][0] == continents[0]) {
      texture(africaTex);
      ellipse(d * 70 + 125, 920 - data[d][2], 20, 20);
    }
    // Asia
    if (data[d][0] == continents[1]) {
      texture(asiaTex);
      ellipse(d * 70 - 1060, 920 - data[d][2], 20, 20);
    }
    // Europe
    if (data[d][0] == continents[2]) {
      texture(europeTex);
      ellipse(d * 70 - 2245, 920 - data[d][2], 20, 20);
    }
    // North America
    if (data[d][0] == continents[3]) {
      texture(nAmericaTex);
      ellipse(d * 70 - 3440, 920 - data[d][2], 20, 20);
    }
    // Oceania
    if (data[d][0] == continents[4]) {
      texture(oceaniaTex);
      ellipse(d * 70 - 4630, 920 - data[d][2], 20, 20);
    }
    // South America
    if (data[d][0] == continents[5]) {
      texture(sAmericaTex);
      ellipse(d * 70 - 5820, 920 - data[d][2], 20, 20);
    }
  }

  fill(255);
  // Draw key
  rect(1120, 250, 220, 220);
  fill(0);
  textSize(22);
  textAlign(LEFT);
  text('Key', 1210, 270);
  // Africa
  text('=   Africa', 1175, 300);
  texture(africaTex);
  ellipse(1150, 295, 20, 20);
  // Asia
  text('=   Asia', 1175, 330);
  texture(asiaTex);
  ellipse(1150, 325, 20, 20);
  // Europe
  text('=   Europe', 1175, 360);
  texture(europeTex);
  ellipse(1150, 355, 20, 20);
  // N.America
  text('=   North America', 1175, 390);
  texture(nAmericaTex);
  ellipse(1150, 385, 20, 20);
  // Oceania
  text('=   Oceania', 1175, 420);
  texture(oceaniaTex);
  ellipse(1150, 415, 20, 20);
  // S.America
  text('=   South America', 1175, 450);
  texture(sAmericaTex);
  ellipse(1150, 445, 20, 20);

}