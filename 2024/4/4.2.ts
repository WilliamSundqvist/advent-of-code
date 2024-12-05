import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
var sum = 0;
const lines = data.split('\n').filter((l) => l !== "");
const yMax = lines.length;

const xMax = lines[0].replace(/\r|\n/g, '').length;

var tempLines = Array.from({ length: yMax }, () => Array(xMax).fill("."));

var leftMas = [[-1, -1], [1, 1]];
var rightMas = [[-1, 1], [1, -1]];

for (var y = 1; y < yMax - 1; y++) {
    for (var x = 1; x < xMax - 1; x++) {
        if (lines[y][x] == "A") {
            var lastC = "";
            var success = false;
            console.log(`Checking position (${y}, ${x})`);
            var lastPos: number[][] = [[y, x]];
            for (const pos of leftMas) {
                var c = lines[y + pos[0]][x + pos[1]];
                if (c != "A" && c != "X" && c != lastC) {
                    if (lastC != "") {
                        lastPos.push([y + pos[0], x + pos[1]]);
                        success = true;
                        continue;
                    }
                    lastPos.push([y + pos[0], x + pos[1]]);
                    lastC = c;
                }
                else {
                    success = false;
                    lastPos = [];
                    lastC = "";
                }
            }
            var lastC = "";
            for (const pos of rightMas) {
                var c = lines[y + pos[0]][x + pos[1]];
                if (c != "A" && c != "X" && c != lastC) {
                    if (lastC != "") {
                        lastPos.push([y + pos[0], x + pos[1]]);
                        success = true;
                        continue;
                    }
                    lastPos.push([y + pos[0], x + pos[1]]);
                    lastC = c;
                }
                else {
                    success = false;
                    lastPos = [];
                    lastC = "";
                }
            }
            if (success && lastPos.length > 3) {
                console.log(lastPos);
                for (const pos of lastPos) {
                    tempLines[pos[0]][pos[1]] = lines[pos[0]][pos[1]];
                }
                sum++;
                console.log(`Incrementing sum, current value: ${sum}`);
            }
        }
    }
}
console.log(tempLines.join("\n"));

console.log("Result: " + sum);
// PART TWO


