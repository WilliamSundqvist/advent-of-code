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

var seedToSoilMap: MapRow[] = [];
var soilToFertMap: MapRow[] = [];
var fertToWaterMap: MapRow[] = [];
var waterTolightMap: MapRow[] = [];
var lightToTempMap: MapRow[] = [];
var TempToHumMap: MapRow[] = [];
var HumToLocMap: MapRow[] = [];

var seedsAreDone = false;

for (var [i, l] of lines.entries())
{

    if (l == "")
        continue;

    const status = ORDER[orderIndex];

    if (status == SEEDS && !seedsAreDone)
    {
        var seedString = l.split(": ")[1];
        console.log(seedString);
        seeds = seedString.split(" ");
        seedsAreDone = true;
        continue;
    }

    if (l.includes(":"))
        orderIndex++;

    if (status == SEED_TO_SOIL)
    {
        addToMap(seedToSoilMap, l);
    }
    if (status == SOIL_TO_FERT)
    {
        addToMap(soilToFertMap, l);
    }
    if (status == FERT_TO_WATER)
    {
        addToMap(fertToWaterMap, l);
    }
    if (status == WATER_TO_LIGHT)
    {
        addToMap(waterTolightMap, l);
    }
    if (status == LIGHT_TO_TEMP)
    {
        addToMap(lightToTempMap, l);
    }
    if (status == TEMP_TO_HUM)
    {
        addToMap(TempToHumMap, l);
    }
    if (status == HUM_TO_LOC)
    {
        addToMap(HumToLocMap, l);
    }
}

//Time to get the locations for the seeds
var locations: string[] = [];
var minLoc = Number.MAX_VALUE;
for (var seed of seeds)
{
    var soil = getDestination(seed, seedToSoilMap);
    var fert = getDestination(soil, soilToFertMap);
    var water = getDestination(fert, fertToWaterMap);
    var light = getDestination(water, waterTolightMap);
    var temp = getDestination(light, lightToTempMap);
    var hum = getDestination(temp, TempToHumMap);
    var location = getDestination(hum, HumToLocMap);
    if (+location < minLoc)
        minLoc = +location;
    locations.push(location);
}
console.log(locations);
console.log(minLoc)




function addToMap(map: MapRow[], line: string)
{
       var parts = l.split(" ");
       var destinationStart = +parts[0];
       var sourceStart = +parts[1];
       var range = +parts[2];
       for(var i=0; i<range; i++)
       {
            var mapRow: MapRow = {source: ""+(sourceStart + i), destination: ""+(destinationStart + i) }
            map.push(mapRow);
       }
}

function getDestination(value: string, map: MapRow[]): string
{
    return map.find(e => e.source == value)?.destination ?? value;
}


