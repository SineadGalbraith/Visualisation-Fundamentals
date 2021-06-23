data = [];
continents = [];
years = [];
var color1, cplor2;

function preload() {
  table = loadTable('total-number-of-people-aged-15-with-no-education-in-millions-by-continent-1970-2050.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1200, 500);

  // Get rows from Table
  rows = table.getRows();
  numberOfRows = table.getRowCount();

  // Add rows to 'data' array
  for (var r = 0; r < numberOfRows; r++) {
    data.push(rows[r].arr);
  }

  color1 = color(0);
  color2 = color(255);

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

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") { // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == "X") { // Left to right gradient
    for (let j = x; j <= x + w; j++) {
      var inter2 = map(j, x, x + w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  }

}


function draw() {
  background(220);
  textAlign(CENTER);
  fill(0);

  textSize(18);
  text('Total Number of People Aged 15+ with \n No Education (in Millions) by Continent - 1970 to 2050', 600, 30);

  push();
  translate(35, 275);
  rotate(radians(-90));
  text('Entity (Continent)', 0, 0);
  pop();

  text('Year', 600, 485);

  // line(185, 130, 1035, 130);
  // Draw x-axis  
  line(185, 6 * 50 + 130, 1035, 6 * 50 + 130);
  for (var y in years) {
    textSize(15);
    fill(0);
    // line(y * 50 + 235, 6 * 50 + 130, y * 50 + 235, 130);
    text(years[y], y * 50 + 210, 450);
  }

  // Draw y-axis
  line(185, 130, 185, 6 * 50 + 130);

  for (var co = 0; co < continents.length; co++) {
    textAlign(RIGHT);
    textSize(15);
    fill(0);
    // line(176, c * 50 + 130, 1035,  c * 50 + 130);
    text(continents[co], 165, co * 50 + 153);
  }

  // Draw boxes
  for (var ye = 0; ye < years.length; ye++) {
    for (var d = 0; d < data.length; d++) {
      for (var c = 0; c < continents.length; c++) {
        if (data[d][0] == continents[c] && data[d][1] == years[ye]) {
          noStroke();
          var greyscale = 255 - ((data[d][2] / 600) * 255);
          fill(greyscale);
          rect(ye * 50 + 185, c * 50 + 130, 49.9, 49.9);
        }
      }
    }
  }

  // Draw Guide
  setGradient(1085, 130, 30, 300, color1, color2, "Y");
  textAlign(LEFT);
  textSize(18);
  fill(0);
  text(600, 1125, 140);
  text(400, 1125, 237);
  text(200, 1125, 335);
  text(0, 1125, 430);

}