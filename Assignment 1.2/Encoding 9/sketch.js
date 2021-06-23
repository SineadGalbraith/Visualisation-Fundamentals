data = [];
continents = [];
continentsMax = [0, 0, 0, 0, 0, 0];
percentages = [];
angles = [];
var africaTex, asiaTex, europeTex, nAmericaTex, oceaniaTex, sAmericaTex, fontRegular;
var maxPeople;
var tex;

function preload() {
  table = loadTable('total-number-of-people-aged-15-with-no-education-in-millions-by-continent-1970-2050.csv', 'csv', 'header');
  africaTex = loadImage('AfricaTexture1.jpg');
  asiaTex = loadImage('AsiaTexture1.jpg');
  europeTex = loadImage('EuropeTexture2.jpg');
  nAmericaTex = loadImage('NorthAmericaTexture1.jpg');
  oceaniaTex = loadImage('OceaniaTexture1.jpg');
  sAmericaTex = loadImage('SouthAmericaTexture1.jpg');
  fontRegular = loadFont('abel-regular.ttf');
}

function setup() {
  createCanvas(2800, 2800, WEBGL);
  rows = table.getRows();
  numberOfRows = table.getRowCount();

  // Add rows to 'data' array
  for (var r = 0; r < numberOfRows; r++) {
    data.push(rows[r].arr);
  }

  textFont(fontRegular);
  getContinents(data);
  maxPeople = getMaxPeople(data);
  getContinentsMax(data);
  getPercentages(continentsMax);
  getAngles(percentages);

  noLoop();
}

function getContinents(data) {
  for (var i = 0; i < data.length; i++) {
    if (!continents.includes(data[i][0])) {
      continents.push(data[i][0]);
    }
  }
}

function getMaxPeople(data) {
  var people = 0;
  for (var j = 0; j < data.length; j++) {
    people += float(data[j][2]);
  }
  return people;
}

function getContinentsMax(data) {
  for (var k = 0; k < data.length; k++) {
    if (data[k][0] == 'Africa') {
      continentsMax[0] += float(data[k][2]);
    } else if (data[k][0] == 'Asia') {
      continentsMax[1] +=float(data[k][2]);
    } else if (data[k][0] == 'Europe') {
      continentsMax[2] += float(data[k][2]);
    } else if (data[k][0] == 'North America') {
      continentsMax[3] += float(data[k][2]);
    } else if (data[k][0] == 'Oceania') {
      continentsMax[4] += float(data[k][2]);
    } else if (data[k][0] == 'South America') {
      continentsMax[5] += float(data[k][2]);
    }
  }
}

function getPercentages(continentsMax) {
  for (var l = 0; l < continentsMax.length; l++) {
    percentages[l] = float((((continentsMax[l]) / maxPeople) * 100).toFixed(2));
  }
}

function getAngles(percentages) {
  for (var p = 0; p < percentages.length; p++) {
    angles[p] = float(((percentages[p] / 100) * 360).toFixed(2));
  }
}

function pieChart(diameter, data) {
  var lastAngle = 0;
  for (var i = 0; i < data.length; i++) {
    if (i == 0) {
      texture(africaTex);
      arc(400, 430, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
      lastAngle += radians(angles[i]);
    }
    if (i == 1) {
      texture(asiaTex);
      arc(400, 430, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
      lastAngle += radians(angles[i]);
    }
    if (i == 2) {
      texture(europeTex);
      arc(400, 430, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
      lastAngle += radians(angles[i]);
    }
    if (i == 3) {
      texture(nAmericaTex);
      arc(400, 430, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
      lastAngle += radians(angles[i]);
    }
    if (i == 4) {
      texture(oceaniaTex);
      arc(400, 430, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
      lastAngle += radians(angles[i]);
    }
    if (i == 5) {
      texture(sAmericaTex);
      arc(400, 430, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
      lastAngle += radians(angles[i]);
    }
  }
}

function draw() {
  background(220);
  pieChart(700, angles);
  
  fill(0);
  textSize(23);
  textAlign(CENTER);
  text('Cumulative Total Percentage of People Aged 15+ with \n No Education by Continent - 1970 to 2050', 650, -10);
  
   fill(245);
  // Draw key
  rect(850, 50, 370, 240);
  fill(0);
  textAlign(LEFT);
  text('Key', 1000, 75);
  // Africa
  text('Africa', 720, 650)
  text('=   Africa (21.93%)', 950, 110);
  texture(africaTex);
  rect(880, 95, 50, 10);
  // Asia
  text('Asia', 0, 300)
  text('=   Asia (70.72%)', 950, 140);
  texture(asiaTex);
  rect(880, 125, 50, 10);
  // Europe
  text('Europe', 750, 300)
  text('=   Europe (2.99%)', 950, 170);
  texture(europeTex);
  rect(880, 155, 50, 10);
  // N.America
  text('North America', 770, 360)
  text('=   North America (1.79%)', 950, 200);
  texture(nAmericaTex);
  rect(880, 185, 50, 10);
  // Oceania
  text('=   Oceania = (0.02%)', 950, 230);
  texture(oceaniaTex);
  rect(880, 215, 50, 10);
  // S.America
  text('South America', 780, 410)
  text('=   South America (2.57%)', 950, 260);
  texture(sAmericaTex);
  rect(880, 245, 50, 10);
}