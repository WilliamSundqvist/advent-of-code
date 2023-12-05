import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\r\n');

interface MapRow { source: string, destination: string };

const SEEDS = "SEEDS";
const SEED_TO_SOIL = "STS"
const SOIL_TO_FERT = "STF";
const FERT_TO_WATER = "FTW";
const WATER_TO_LIGHT = "WTL";
const LIGHT_TO_TEMP = "LTT";
const TEMP_TO_HUM = "TTH";
const HUM_TO_LOC = "HTL";

var ORDER = [SEEDS, SEED_TO_SOIL, SOIL_TO_FERT, FERT_TO_WATER, WATER_TO_LIGHT, LIGHT_TO_TEMP, TEMP_TO_HUM, HUM_TO_LOC];
var orderIndex = 0;

var sum = 0;
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

