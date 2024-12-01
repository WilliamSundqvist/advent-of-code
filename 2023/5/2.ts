import * as fs from 'fs';
import { start } from 'repl';
import { Guid } from 'guid-ts';

//The SeedMap class that takes care of everything important
class SeedMap { 
    orderedSourcesList: number[] = [];
    orderedDestinationList: number[] = [];
    orderedWidthList: number[] = [];

    clear()
    {
        this.orderedSourcesList = [];
        this.orderedDestinationList = [];
        this.orderedWidthList = [];
    }
   
    getMappedRanges(inputs: InputRange[]): InputRange[]
    {
        var result: InputRange[] = [];
        while(inputs.length > 0){
            var seed = inputs[0];
            var handled = false;
            var minSourceMin = Number.MAX_VALUE;
            for(let i = 0; i < this.orderedSourcesList.length; i++)
            {
                var sourceMin = this.orderedSourcesList[i];
                var sourceMax = this.orderedSourcesList[i] + this.orderedWidthList[i] - 1;
                var destinationMin = this.orderedDestinationList[i];

                var newStart = seed.start;
                var newEnd = seed.end;

                var difference = destinationMin - sourceMin;

                //console.log("This map converts: ", sourceMin, "-", sourceMax, "to", destinationMin, "which is a difference of ", difference);

                if (minSourceMin < sourceMin)
                    minSourceMin = sourceMin;
                if (seed.start > sourceMax)
                    continue
                if (seed.end < sourceMin)
                    continue;
                //console.log(seed, "will be converted");

                

                //The seed has some values in the beginning that are not in source
                //Add the range outside of source-range as a new range to handle
                if (seed.start < sourceMin)
                {
                    var newInputRange: InputRange = { id: "s+"+Guid.newGuid().toString(), start: seed.start, end: sourceMin - 1 }
                    inputs.push(newInputRange);
                    newStart = sourceMin;
                }

                //This seed has some values in the end that are not in source
                //Add the range outside of source-range as a new range to handle
                if (seed.end > sourceMax)
                {
                    var newInputRange: InputRange = { id: "e+"+Guid.newGuid().toString(), start: sourceMax+1, end: seed.end }
                    inputs.push(newInputRange);
                    newEnd = sourceMax;
                }

                newEnd += difference;
                newStart += difference;
                
                var newInputRange: InputRange = { id: seed.id, start: newStart, end: newEnd  };
                result.push(newInputRange);
                handled = true;
            }
            if (!handled)
            {
                //This seed is not handled by any of the maps, so we keep it as it is
                result.push(seed);
            }
            inputs.shift();
        }
        return result;
    }
}

console.time("Finished in"); //Start a timer

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\r\n');

interface InputRange { id: string, start: number, end: number }
var seeds: string[] = [];

var seedString = lines[0].split(": ")[1];
seeds = seedString.split(" ");

var currentSeedRange: InputRange = { id:"", start:0, end: 0 };
var inputRange: InputRange[] = [];

//Get the input seed ranges
for (var [i, s] of seeds.entries())
{
    var seed = +s;
    if (i%2 != 0)
    {
        currentSeedRange.end = currentSeedRange.start + seed - 1;
        inputRange.push(currentSeedRange);
        continue;
    }
    currentSeedRange = { id:0+":"+i, start:seed, end: 0 };
}
var inputs: InputRange[] = inputRange; 
var nextInputs: InputRange[] = [];
var currentMap: SeedMap = new SeedMap();
for (let index = 3; index<lines.length; index++)
{
    var line = lines[index];
    if (line == "")
    {
        nextInputs = currentMap.getMappedRanges(inputs);
        continue;
    }
    if (line.includes(":"))
    {
        currentMap.clear();
        inputs = nextInputs;
        //console.log(line);
        continue;
    }
    
    var splitMap = line.split(" ");
    var destinationStart = +splitMap[0];
    var sourceStart = +splitMap[1];
    var mapRange = +splitMap[2];

    currentMap.orderedDestinationList.push(destinationStart);
    currentMap.orderedWidthList.push(mapRange);
    currentMap.orderedSourcesList.push(sourceStart);
}

var finalResult = currentMap.getMappedRanges(inputs);
var sortedMinStart = finalResult.sort((a, b)=> a.start-b.start);
var smallest = sortedMinStart[0];
//console.log(sortedMinStart);
console.log(smallest);
console.timeEnd("Finished in")

