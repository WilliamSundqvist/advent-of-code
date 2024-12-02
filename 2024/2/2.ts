import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\n');
var sum = 0;

for (const l of lines) {
    if (l == "") {
        break;
    }
    var first = true
    var change: number = 0;
    var numbers = l.split(" ");
    var lastDiff: number = 0;
    var lastNumber = -99999999;
    var error = false;

    for (const n of numbers) {
        var num = Number(n)
        if (first) {
            lastNumber = num;
            first = false;
            continue;
        }
        lastDiff = lastNumber - num;

        var abs = Math.abs(lastDiff);
        if (!(abs >= 1 && abs <= 3)) {
            error = true;
            break;
        }
        lastNumber = num;
        if ((lastDiff < 0 && change > 0) || (lastDiff > 0 && change < 0)) {
            error = true;
            break;
        }

        change = lastDiff;

    }

    if (!error) {
        sum++;
    }

}


console.log("Result: " + sum);

// PART TWO

sum = 0

for (const l of lines) {
    if (l == "") {
        break;
    }
    var numbs: number[] = l.split(" ").map(Number);

    if (isLineCorrect(numbs)) {
        sum++;
    }

}

function isLineCorrect(numbers: number[], removed = false): boolean {
    var lastDiff: number = 0;
    var index = -1;
    var lastNumber = 0;
    var first = true;
    for (const num of numbers) {

        index++;
        if (first) {
            lastNumber = num;
            first = false;
            continue;
        }

        const diff = lastNumber - num;
        const absDiff = Math.abs(diff);

        if (!(absDiff >= 1 && absDiff <= 3)) {
            if (removed) {
                return false;
            }
            return isAnyRemovalCorrect(numbers);
        }

        if ((lastDiff < 0 && diff > 0) || (lastDiff > 0 && diff < 0)) {
            if (removed) {
                return false;
            }
            return isAnyRemovalCorrect(numbers);
        }

        lastNumber = num;
        lastDiff = diff;
    }
    return true;
}

function isAnyRemovalCorrect(numbers: number[]) {
    for (let index = 0; index < numbers.length; index++) {
        const removeCurrent = numbers.filter((_, i) => i !== index);
        if (isLineCorrect(removeCurrent, true)) {
            return true;
        }
    }
    return false;
}

console.log("Result: " + sum);
