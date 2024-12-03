import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\n');
var sum = 0;
var current = "";
var nextValueShouldBe: string[] = ["m", "u", "l", "("];
var stage = 0
var firstNumber = "";
var secondNumber = "";
var enabled = true;
var currentDoDont = "";
var nextDoDontShouldBe = ["d", "o", "n", "'", "t", "(", ")"]
for (const l of lines) {
    if (l == "") {
        break;
    }
    for (const char of l) {
        if (char == nextDoDontShouldBe[0]) {
            currentDoDont += char;
            nextDoDontShouldBe.shift()
            if (currentDoDont == "don't()") {
                enabled = false;
                currentDoDont = "";
                nextDoDontShouldBe = ["d", "o", "(", ")"]
            }
            if (currentDoDont == "do()") {
                enabled = true;
                currentDoDont = "";
                nextDoDontShouldBe = ["d", "o", "n", "'", "t", "(", ")"]
            }
        } else {
            if (enabled) {
                nextDoDontShouldBe = ["d", "o", "n", "'", "t", "(", ")"]
            } else {
                nextDoDontShouldBe = ["d", "o", "(", ")"]
            }
            currentDoDont = "";
        }
        if (!enabled) {
            continue;
        }
        if (stage == 0) {
            if (char == nextValueShouldBe[0]) {
                current += char;
                nextValueShouldBe.shift()

                if (nextValueShouldBe.length == 0) {
                    stage++;
                    nextValueShouldBe = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                    continue;
                }
            } else {
                reset()
            }
        }
        if (stage == 1) {
            if (nextValueShouldBe.includes(char)) {
                current += char;
                firstNumber += char;
                nextValueShouldBe.push(",");
                stage++;
                continue;
            } else {
                reset()
            }
        }

        if (stage == 2) {
            if (nextValueShouldBe.includes(char)) {
                current += char;
                if (char == ",") {
                    stage++;
                    nextValueShouldBe.pop();
                    continue;
                }
                firstNumber += char;
            } else {
                reset()
            }
        }

        if (stage == 3) {
            if (nextValueShouldBe.includes(char)) {
                secondNumber += char;
                current += char;
                nextValueShouldBe.push(")");
                stage++;
                continue;
            } else {
                reset()
            }
        }
        if (stage == 4) {
            if (nextValueShouldBe.includes(char)) {
                current += char;
                if (char == ")") {
                    stage++;
                    nextValueShouldBe.pop();
                    console.log(current);

                    sum += Number(firstNumber) * Number(secondNumber);
                    reset();
                    continue;
                }
                secondNumber += char;
            } else {
                reset()
            }
        }
    }


}

function reset() {
    console.log("reset: ", current);
    current = "";
    nextValueShouldBe = ["m", "u", "l", "("];
    stage = 0;
    firstNumber = "";
    secondNumber = "";
}

console.log("Result: " + sum);

// PART TWO


