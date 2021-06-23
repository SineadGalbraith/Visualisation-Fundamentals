translatedXCoords = {};
translatedYCoords = {};
translatedTempCoords = {};

table1 = [];
table2 = [];
table3 = [];

var minX = 24.0;
var maxX = 38.1;
var minY = 53.9;
var maxY = 56.1;
var maxTemp = 0;
var minTemp = -30;
var maximumSurvivors = 0;
var minimumSurvivors = 0;

var colour1, colour2, colour3, colour4, colour5, colour6, colour7;

function preload() {
  table_1 = loadTable('Table1.csv', 'csv', 'header');
  table_2 = loadTable('Table2.csv', 'csv', 'header');
  table_3 = loadTable('Table3.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1800, 700);

  translateX();
  translateY();
  translateTemp();

  colour1 = color(255, 153, 153);
  colour2 = color(0, 128, 255);
  colour3 = color(128, 204, 0);
  colour4 = color(153, 51, 255);
  colour5 = color(32, 32, 32);
  colour6 = color(204, 102, 0);
  colour7 = color(0, 153, 153);

  // Get rows and columns information
  rows1 = table_1.getRows();
  numberOfRows1 = table_1.getRowCount();

  rows2 = table_2.getRows();
  numberOfRows2 = table_2.getRowCount();

  rows3 = table_3.getRows();
  numberOfRows3 = table_3.getRowCount();

  // Table1
  for (var r1 = 0; r1 < numberOfRows1; r1++) {
    table1.push(rows1[r1].arr);
  }

  for (var r2 = 0; r2 < numberOfRows2; r2++) {
    table2.push(rows2[r2].arr);
  }

  for (var r3 = 0; r3 < numberOfRows3; r3++) {
    table3.push(rows3[r3].arr);
  }

  maximumSurvivors = maxSurvivors(table3);
  minimumSurvivors = minSurvivors(table3);

  noLoop()
}

function translateX() {

  var counter = 200;
  for (var i = minX; i < maxX; i = i + 0.1) {
    // translatedXCoords[Math.round(i * 10) / 10] = int(i * 10) + 25;
    translatedXCoords[Math.round(i * 10) / 10] = counter;
    counter += 8;
  }
}

function translateY() {
  var counter = 540;
  for (var j = minY; j < maxY; j = j + 0.1) {
    // translatedYCoords[Math.round(j * 10) / 10] = int(j * 10);
    translatedYCoords[Math.round(j * 10) / 10] = counter;
    counter -= 20;
  }
}

function translateTemp() {
  var counter = 130;
  for (var t = maxTemp; t >= minTemp; t--) {
    translatedTempCoords[t] = counter;
    counter += 14;
  }
}

function maxSurvivors(table3) {
  var maxSur = 0;
  for (var t = 0; t < table3.length; t++) {
    // console.log(int(table3[t][3]))
    if (int(table3[t][2]) > maxSur) {
      maxSur = int(table3[t][2]);
    }
    return maxSur;
  }
}

function minSurvivors(table3) {
  var minSur = maximumSurvivors;
  for (var t = 0; t < table3.length; t++) {
    if (int(table3[t][2]) < minSur) {
      minSur = int(table3[t][2]);
    }
  }
  return minSur;
}


function draw() {
  background(220);
  // background(bg);
  // image(bg, 0, 0, translatedXCoords[float(37.6)] + 20, translatedYCoords[minY] + 60)

  textAlign(CENTER);
  fill(0);

  textSize(20);
  text('Napoleon\'s March to Russia', 750, 80);

  push();
  translate(translatedXCoords[minX] - 100, 325);
  rotate(radians(-90));
  text('Latitude', 0, 0);
  pop();

  push();
  translate(translatedXCoords[maxX - 0.1] + 100, 325);
  rotate(radians(90));
  text('Temperature', 0, 0);
  pop();

  text('Longitude', 750, translatedYCoords[minY] + 80);

  // Draw x-axis
  line(translatedXCoords[minX] - 30, translatedYCoords[minY] + 10, translatedXCoords[maxX - 0.1] + 30, translatedYCoords[minY] + 10);
  for (var i = 24; i <= 38; i = i + 2) {
    textSize(15);
    text(i, translatedXCoords[i] - 7, translatedYCoords[minY] + 40)
    line(translatedXCoords[i], translatedYCoords[minY] + 10, translatedXCoords[i], translatedYCoords[minY] + 20)
  }

  // Draw y1-axis
  line(translatedXCoords[minX] - 30, translatedYCoords[minY] + 10, translatedXCoords[minX] - 30, translatedYCoords[maxY - 0.1]);
  for (var j = 56; j >= 54; j = j - 0.5) {
    textSize(15);
    text(j, translatedXCoords[minX] - 60, translatedYCoords[j])
    line(translatedXCoords[minX] - 30, translatedYCoords[j], translatedXCoords[minX] - 40, translatedYCoords[j])
  }

  // Draw y2-axis
  line(translatedXCoords[maxX - 0.1] + 30, translatedYCoords[minY] + 10, translatedXCoords[maxX - 0.1] + 30, translatedYCoords[maxY - 0.1]);
  for (var k = 0; k >= -30; k = k - 3) {
    textSize(15);
    text(k, translatedXCoords[maxX - 0.1] + 60, translatedTempCoords[k] + 5)
    line(translatedXCoords[maxX - 0.1] + 30, translatedTempCoords[k], translatedXCoords[maxX - 0.1] + 40, translatedTempCoords[k])
  }

  // Draw key
  textSize(20);
  fill(255);
  rect(translatedXCoords[maxX - 0.1] + 160, translatedYCoords[maxY - 0.1] - 20, 230, 160);
  rect(translatedXCoords[maxX - 0.1] + 160, translatedYCoords[maxY - 0.1] + 160, 230, 200);
  rect(translatedXCoords[maxX - 0.1] + 160, translatedYCoords[maxY - 0.1] + 380, 230, 40);

  fill(0)
  text('Survivors', translatedXCoords[maxX - 0.1] + 275, translatedYCoords[maxY - 0.1] + 5);
  text('Direction', translatedXCoords[maxX - 0.1] + 275, translatedYCoords[maxY - 0.1] + 190);

  // Survivors
  textSize(18);
  text('Temperature', translatedXCoords[maxX - 0.1] + 320, translatedYCoords[maxY - 0.1] + 405)
  var maxWeight = ((maximumSurvivors / maximumSurvivors) * 100) * 0.5;
  var midWeight = (((maximumSurvivors / 2) / maximumSurvivors) * 100) * 0.5;
  var minWeight = ((minimumSurvivors / maximumSurvivors) * 100) * 0.5;
  rect(translatedXCoords[maxX - 0.1] + 200, translatedYCoords[maxY - 0.1] + 30, 50, minWeight);
  text('100,000', translatedXCoords[maxX - 0.1] + 320, translatedYCoords[maxY - 0.1] + 35)

  rect(translatedXCoords[maxX - 0.1] + 200, translatedYCoords[maxY - 0.1] + 45, 50, midWeight);
  text('200,000', translatedXCoords[maxX - 0.1] + 320, translatedYCoords[maxY - 0.1] + 65)

  rect(translatedXCoords[maxX - 0.1] + 200, translatedYCoords[maxY - 0.1] + 85, 50, maxWeight - 10);
  text('300,000', translatedXCoords[maxX - 0.1] + 320, translatedYCoords[maxY - 0.1] + 110)

  text('Division 1 (A)', translatedXCoords[maxX - 0.1] + 325, translatedYCoords[maxY - 0.1] + 220)
  text('Division 2 (A)', translatedXCoords[maxX - 0.1] + 325, translatedYCoords[maxY - 0.1] + 245)
  text('Division 3 (A)', translatedXCoords[maxX - 0.1] + 325, translatedYCoords[maxY - 0.1] + 270)
  text('Division 1 (R)', translatedXCoords[maxX - 0.1] + 325, translatedYCoords[maxY - 0.1] + 295)
  text('Division 2 (R)', translatedXCoords[maxX - 0.1] + 325, translatedYCoords[maxY - 0.1] + 320)
  text('Division 3 (R)', translatedXCoords[maxX - 0.1] + 325, translatedYCoords[maxY - 0.1] + 345)

  // Direction
  strokeWeight(3);
  stroke(colour1);
  line(translatedXCoords[maxX - 0.1] + 180, translatedYCoords[maxY - 0.1] + 215, translatedXCoords[maxX - 0.1] + 250, translatedYCoords[maxY - 0.1] + 215);

  stroke(colour2);
  line(translatedXCoords[maxX - 0.1] + 180, translatedYCoords[maxY - 0.1] + 240, translatedXCoords[maxX - 0.1] + 250, translatedYCoords[maxY - 0.1] + 240);

  stroke(colour4);
  line(translatedXCoords[maxX - 0.1] + 180, translatedYCoords[maxY - 0.1] + 265, translatedXCoords[maxX - 0.1] + 250, translatedYCoords[maxY - 0.1] + 265);

  stroke(colour5);
  line(translatedXCoords[maxX - 0.1] + 180, translatedYCoords[maxY - 0.1] + 290, translatedXCoords[maxX - 0.1] + 250, translatedYCoords[maxY - 0.1] + 290);
  
  stroke(colour6);
  line(translatedXCoords[maxX - 0.1] + 180, translatedYCoords[maxY - 0.1] + 315, translatedXCoords[maxX - 0.1] + 250, translatedYCoords[maxY - 0.1] + 315);
  
  stroke(colour5);
  line(translatedXCoords[maxX - 0.1] + 180, translatedYCoords[maxY - 0.1] + 340, translatedXCoords[maxX - 0.1] + 250, translatedYCoords[maxY - 0.1] + 340);

  stroke(colour3);
  line(translatedXCoords[maxX - 0.1] + 180, translatedYCoords[maxY - 0.1] + 400, translatedXCoords[maxX - 0.1] + 250, translatedYCoords[maxY - 0.1] + 400)

  // Draw Lines
  var colour;
  for (var t3 = 1; t3 <= table3.length; t3++) {
    if (table3[t3] != undefined) {
      if ((table3[t3][3] == 'A' && table3[t3][4] == '1') && (table3[t3 - 1][3] == 'A' && table3[t3 - 1][4] == '1')) colour = colour1;
      else if ((table3[t3][3] == 'A' && table3[t3][4] == '2') && (table3[t3 - 1][3] == 'A' && table3[t3 - 1][4] == '2')) colour = colour2;
      else if ((table3[t3][3] == 'A' && table3[t3][4] == '3') && (table3[t3 - 1][3] == 'A' && table3[t3 - 1][4] == '3')) colour = colour4;
      else if ((table3[t3][3] == 'R' && table3[t3][4] == '1') && (table3[t3 - 1][3] == 'R' && table3[t3 - 1][4] == '1')) colour = colour5;
      else if ((table3[t3][3] == 'R' && table3[t3][4] == '2') && (table3[t3 - 1][3] == 'R' && table3[t3 - 1][4] == '2')) colour = colour6;
      else if ((table3[t3][3] == 'R' && table3[t3][4] == '3') && (table3[t3 - 1][3] == 'R' && table3[t3 - 1][4] == '3')) colour = colour7;
      // else if (table3[t3][3] == 'R' && table3[t3 - 1][3] == 'R') colour = colour2;
      stroke(colour);
      var weight = (((int(table3[t3][2])) / maximumSurvivors) * 100) * 0.5;
      strokeWeight(weight);

      if (!(float(table3[t3][0]) === 24 && float(table3[t3 - 1][0]) === 28.3)) {
        if (!(float(table3[t3][0]) === 24 && float(table3[t3 - 1][0]) === 24.1)) {
          line(translatedXCoords[float(table3[t3][0])], translatedYCoords[float(table3[t3][1])], translatedXCoords[float(table3[t3 - 1][0])], translatedYCoords[float(table3[t3 - 1][1])]);

        }
      }
    }
  }

  // Draw Temp
  for (var t2 = 1; t2 <= table2.length; t2++) {
    stroke(colour3);
    strokeWeight(3);
    if (table2[t2] != undefined) {
      line(translatedXCoords[float(table2[t2][0])], translatedTempCoords[float(table2[t2][1])], translatedXCoords[float(table2[t2 - 1][0])], translatedTempCoords[float(table2[t2 - 1][1])]);
    }
  }

  fill(0)
  // Draw Town Names
  for (var t1 = 0; t1 < table1.length; t1++) {
    textSize(18);
    noStroke()
    text(table1[t1][2], translatedXCoords[float(table1[t1][0])], translatedYCoords[float(table1[t1][1])]);
  }
  
}