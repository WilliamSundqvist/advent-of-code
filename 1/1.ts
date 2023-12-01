import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('C:\\Users\\wsundqvi\\OneDrive - Capgemini\\Documents\\Advent of code\\1\\input.txt'));

var sum = 0;
reader.on("line", (l: string) => {
    var allNumbers = l.match(/[0-9]/g);

    if (allNumbers)
    {
        var firstNumber = allNumbers[0];
        var lastNumber = allNumbers.pop();
        var combined = firstNumber+lastNumber;
        sum += +combined;        
    }
});

reader.on("close", ()=> {
    console.log("Result: " + sum);
})