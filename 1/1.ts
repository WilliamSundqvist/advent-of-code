import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\n');

var sum = 0;
for (var l of lines)
{
    var allNumbers = l.match(/[0-9]/g);

    if (allNumbers)
    {
        var firstNumber = allNumbers[0];
        var lastNumber = allNumbers.pop();
        var combined = firstNumber+lastNumber;
        sum += +combined;        
    }
}
console.log("Result: " + sum);