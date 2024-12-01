import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\n');

var numbers = ["1","2","3","4","5","6","7","8","9","0","one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"];


var sum = 0;
for (var l of lines) {
    var firstIndex = 99;
    var firstNumber = "";
    var lastIndex = -1;
    var lastNumber = "";
    for (var number of numbers) {
        var smallIndex = l.indexOf(number);
        var bigIndex = l.lastIndexOf(number);
        if (smallIndex == -1)
        {
            continue;
        }
        if (smallIndex < firstIndex)
        {
            firstIndex = smallIndex;
            firstNumber = number;
        }
        if (bigIndex > lastIndex)
        {
            lastIndex = bigIndex;
            lastNumber = number;
        }
    }
    var result = numberValue(firstNumber) +  numberValue(lastNumber);
    sum += +result;
}

console.log("Result: " + sum);

function numberValue(word: string)
{
    switch(word) {
        case "zero": {
            return "0";
        }
        case "one": {
            return "1";
        }
        case "two": {
            return "2";
        }
        case "three": {
            return "3";
        }
        case "four": {
            return "4";
        }
        case "five": {
            return "5";
        }
        case "six": {
            return "6";
        }
        case "seven": {
            return "7";
        }
        case "eight": {
            return "8";
        }
        case "nine": {
            return "9";
        }
        default:
            return word;
    }
}