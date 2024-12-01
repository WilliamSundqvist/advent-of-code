import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\n');

let sum = 0;
let sortedListL: number[] = [];
let sortedListR: number[] = [];

for (const l of lines) {
    if (l == "") {
        continue;
    }
    const leftRight = l.split("   ");
    console.log(leftRight);

    const left = leftRight[0];
    const right = leftRight[1];
    sortedListL.push(Number(left));
    sortedListR.push(Number(right));
}
sortedListL.sort((a, b) => Number(a) - Number(b));
sortedListR.sort((a, b) => Number(a) - Number(b));
for (let i = 0; i < sortedListL.length; i++) {
    var diff = Math.abs(sortedListL[i] - sortedListR[i]);
    sum += diff;
}

console.log("Result: " + sum);

sum = 0;
for (let i = 0; i < sortedListL.length; i++) {
    var hits = sortedListR.filter((element) => element == sortedListL[i]).length
    sum += sortedListL[i] * hits
}


console.log("Result: " + sum);

