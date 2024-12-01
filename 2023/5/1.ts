import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\r\n');

var seeds: string[] = [];

var seedString = lines[0].split(": ")[1];
seeds = seedString.split(" ");

var result = finalDestinationFromSource(seeds, [], 3)
console.log(result);
console.log(result.sort((a,b) => +a - +b)[0])


function finalDestinationFromSource(input: string[], nextInput: string[], index: number)
{
    if (index == lines.length)
    {
        for (var object of input)
        {
            nextInput.push(object);
        }
        return nextInput;
    }
    if (lines[index] == "")
    {
        for (var object of input)
        {
            nextInput.push(object);
        }
        return finalDestinationFromSource(nextInput, [], index + 1)
    }
    if (lines.includes(":"))
        return finalDestinationFromSource(input, nextInput, index + 1);
    
    var map = lines[index];
    var splitMap = map.split(" ");
    var destinationStart = +splitMap[0];
    var sourceStart = +splitMap[1];
    var range = +splitMap[2];
    for (var s of input)
    {
        //Seed has to be larger than start
        var seed = +s;
        if (+seed >= sourceStart && +seed < sourceStart + range)
        {
            var distanceFromStart = seed - sourceStart;
            var destinationValue = destinationStart + distanceFromStart;
            input = input.filter((o) => o != s);
            nextInput.push("" + destinationValue);
        }
    }
    return finalDestinationFromSource(input, nextInput, index + 1);

}

