import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
var sum = 0;
const lines = data.split('\n').filter((l) => l !== "");
const yMax = lines.length;

const xMax = lines[0].replace(/\r|\n/g, '').length;
console.log(lines[0]);
var diagonals: string[] = [];

// ---------- Left to right ------
//
// Find middle to left
for (var h = 0; h < yMax; h++) {
    var diagonal: string = "";
    var x = 0;
    var y = h;
    while (x < xMax && y < yMax) {
        diagonal += lines[y][x] || '';
        x++;
        y++;
    }
    if (diagonal !== "")
        diagonals.push(diagonal);
}

//Find middle to right
for (var w = 1; w < xMax; w++) {
    var diagonal: string = "";
    var x = w;
    var y = 0;
    while (x < xMax && y < yMax) {
        diagonal += lines[y][x] || '';
        x++;
        y++;
    }
    if (diagonal !== "")
        diagonals.push(diagonal);
}

console.log("Result: " + diagonals);
// ------------ Right to left ----------
// Find middle to right
for (var h = 0; h < yMax; h++) {
    var diagonal: string = "";
    var x = xMax - 1;
    var y = h;
    while (x >= 0 && y < yMax) {
        diagonal += lines[y][x];
        x--;
        y++;
    }
    if (diagonal !== "")
        diagonals.push(diagonal);
}

//Find middle to left
for (var w = xMax - 2; w >= 0; w--) {
    var diagonal: string = "";
    var x = w;
    var y = 0;
    while (x >= 0 && y < yMax) {
        diagonal += lines[y][x];
        x--;
        y++;
    }
    if (diagonal !== "")
        diagonals.push(diagonal);
}

diagonals = diagonals.concat(lines);

for (var x = 0; x < xMax; x++) {
    var verticalWord: string = "";
    for (var y = 0; y < yMax; y++) {
        verticalWord += lines[y][x];
    }
    if (verticalWord !== "")
        diagonals.push(verticalWord);
}

console.log("Result: " + diagonals);
for (const diagonal of diagonals) {
    sum += diagonal.split("XMAS").length - 1
    sum += diagonal.split("SAMX").length - 1
}

console.log("Result: " + sum);
// PART TWO


