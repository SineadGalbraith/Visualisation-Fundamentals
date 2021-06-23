continents = [];
years = [];
numbers = [];
rows = [];
data = [];
currentYear = '2020';
displayData = [];
colours = [];
colourArray = [];

function preload() {
  table = loadTable('total-number-of-people-aged-15-with-no-education-in-millions-by-continent-1970-2050.csv', 'csv', 'header');
}

function setup() {
  // Window Size
  createCanvas(750, 600);

  // Get rows and columns information
  rows = table.getRows();
  numberOfRows = table.getRowCount();

  colours = generateColours();

  // Get all rows for the Year 2020
  for (var r = 0; r < numberOfRows; r++) {
    if (rows[r].arr[1] == currentYear) {
      data.push(rows[r].arr);
    }
  }
  noLoop();
}

function generateColours() {

  colourArray[0] = color(153, 255, 255);
  colourArray[1] = color(255, 153,204);
  colourArray[2] = color(255, 255, 153);
  colourArray[3] = color(204, 255, 153);
  colourArray[4] = color(255, 204, 153);
  colourArray[5] = color(204, 153, 255);

  return colourArray;
}

function draw() {
  background(220);
  textAlign(CENTER);
  fill(0);

  textSize(18);
  text('Total Number of People Aged 15+ with \n No Education (in Millions) in Each Continent in the Year 2020', 375, 20);
  
  push();
  translate(35, 275);
  rotate(radians(-90));
  text('Number of People (Millions)', 0, 0);
  pop();
  
  text('Entity (Continent)', 375, 585);

  for (var s = 0; s < data.length; s++) {
    textSize(14);
    fill(0);
    text(data[s][0], s * 100 + 120, 550);
    displayData[s] = data[s][2];
    fill(colours[s]);
    rect(s * 100 + 97, 530 - displayData[s], 50, displayData[s]);
  }

  maxValue = max(displayData);
  line(87, 80, 87, 530);
  line(87, 530, 645, 530);
  for (var b = 0; b < maxValue + 50; b = b + 50) {
    fill(0);
    line(80, 530 - b, 87, 530 - b);
    text(b, 65, 530 - b);
  }
  
  fill(255);
  
  // Draw key
  rect(520, 60, 220, 170);
  fill(0);
  textSize(18);
  textAlign(LEFT);
  text('Key', 605, 80);
  text('=   Africa', 580, 110);
  text('=   Asia', 580, 130);
  text('=   Europe', 580, 150);
  text('=   North America', 580, 170);
  text('=   Oceania', 580, 190);
  text('=   South America', 580, 210);
  fill(colours[0]);
  rect(535, 100, 30, 10);
  fill(colours[1]);
  rect(535, 120, 30, 10);
  fill(colours[2]);
  rect(535, 140, 30, 10);
  fill(colours[3]);
  rect(535, 160, 30, 10);
  fill(colours[4]);
  rect(535, 180, 30, 10);
  fill(colours[5]);
  rect(535, 200, 30, 10);
}