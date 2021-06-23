data = [];
continents = [];
years = [];
colours = [];
yearsMax = {};
displayData = [];
currentHeightMax = {};

function preload() {
  table = loadTable('total-number-of-people-aged-15-with-no-education-in-millions-by-continent-1970-2050.csv', 'csv', 'header');
}

function setup() {
  // Window Size
  createCanvas(1300, 1000);

  // Get rows from Table
  rows = table.getRows();
  numberOfRows = table.getRowCount();

  // Add rows to 'data' array
  for (var r = 0; r < numberOfRows; r++) {
    data.push(rows[r].arr);
  }

  // Load continents and years data into arrays
  getContinents(data);
  getYears(data);
  getColours();
  getYearMax(data);
  setCurrentHeightMax(years);

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

function getColours() {
  colours[0] = color('red');
  colours[1] = color('orange');
  colours[2] = color('yellow');
  colours[3] = color(0, 204, 0);
  colours[4] = color(0, 255, 255);
  colours[5] = color('purple');
}

function getYearMax(data) {
  for (var i = 0; i < data.length; i++) {
    if (!(float(data[i][1]) in yearsMax)) {
      yearsMax[data[i][1]] = float(data[i][2]);
    } else if (float(data[i][1]) in yearsMax) {
      yearsMax[data[i][1]] = float(yearsMax[data[i][1]]) + float(data[i][2]);
    }
  }
}

function findMaxPeopleNum() {

  var keys = Object.keys(yearsMax);
  var max = yearsMax[keys[0]];
  for (i = 0; i < keys.length; i++) {
    var value = yearsMax[keys[i]];
    if (value > max) max = value;
  }
  return max;
}

function setCurrentHeightMax(years) {
  for (var i = 0; i < years.length; i++) {

    if (!(years[i] in currentHeightMax)) {
      currentHeightMax[float(years[i])] = 900;
    }
  }
}

function draw() {
  background(220);
  textAlign(CENTER);
  fill(0);

  textSize(20);
  text('Cumulative Total Number of People Aged 15+ with \n No Education (in Millions) by Continent - 1970 to 2050', 675, 30);
  
  push();
  translate(30, 475);
  rotate(radians(-90));
  text('Number of People (Millions)', 0, 0);
  pop();
  
  text('Year', 675, 965);

  // Draw x-axis
  for (var y in years) {
    textSize(15);
    fill(0);
    text(years[y], y * 70 + 130, 930);
  }

  // Draw y-axis
  maxValue = findMaxPeopleNum();
  line(97, 100, 97, 900);
  line(97, 900, 1275, 900);
  for (var b = 0; b < maxValue + 100; b = b + 100) {
    textSize(15);
    fill(0);
    line(90, 900 - b, 97, 900 - b);
    text(b, 60, 900 - b);
  }

  // Draw bars
  for (var ye = 0; ye < years.length; ye++) {
    for (var c = 0; c < continents.length; c++) {
      for (var d = 0; d < data.length; d++) {
        if (data[d][0] == continents[c] && data[d][1] == years[ye]) {
          fill(colours[c]);
          var newHeight = currentHeightMax[float(data[d][1])] - data[d][2];
          rect(ye * 70 + 110, newHeight, 50, data[d][2]);

          currentHeightMax[float(data[d][1])] = newHeight;
        }
      }
    }
  }
  
  fill(255);
  // Draw key
  rect(1060, 80, 220, 170);
  fill(0);
  textSize(18);
  textAlign(LEFT);
  text('Key', 1150, 100);
  text('=   Africa', 1125, 130);
  text('=   Asia', 1125, 150);
  text('=   Europe', 1125, 170);
  text('=   North America', 1125, 190);
  text('=   Oceania', 1125, 210);
  text('=   South America', 1125, 230);
  fill(colours[0]);
  rect(1075, 120, 30, 10);
  fill(colours[1]);
  rect(1075, 140, 30, 10);
  fill(colours[2]);
  rect(1075, 160, 30, 10);
  fill(colours[3]);
  rect(1075, 180, 30, 10);
  fill(colours[4]);
  rect(1075, 200, 30, 10);
  fill(colours[5]);
  rect(1075, 220, 30, 10);
  
}