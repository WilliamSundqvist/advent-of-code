import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\r\n');

var sum = 0;

class Part { id: string = ""; num: string = ""; adjacent: boolean = false; };
class Symb { value: string = "+"; isSymb = true; };
class Gear { value: string = "*"; isGear = true; neighbors: Part[] = [] };
interface Empty { value: "."}
interface Square {
    Type: Empty | Symb | Part | Gear;
    X: number,
    Y: number;
}

//First we create a bigSchema with objects 
var bigSchema: Square[][] = [];
var y = 0;
for (var l of lines)
{
    var schemaLine: Square[] = [];
    var x = 0;
    var currentPart: Part | null = null;
    for (var c of l)
    {
        if (c == ".")
        {
            schemaLine.push({X: x, Y: y, Type: { value: "."} })
            currentPart = null;
        } else if (!isNaN(parseInt(c)))
        {
            if (currentPart != null)
            {
                currentPart.num += c;
                schemaLine.push({ X: x, Y:y, Type: currentPart })
            }
            else 
            {
                currentPart = { id: "part" + x + "," + y, num: c, adjacent: false }
                schemaLine.push({ X: x, Y:y, Type: currentPart })
            }
        } else if (c == "*")
        {
            schemaLine.push({X: x, Y:y, Type: { value: c, isGear: true, neighbors: []}})
            currentPart = null;
        } else
        {
            schemaLine.push({X: x, Y:y, Type: { value: c, isSymb: true }})
            currentPart = null;
        }
        x++;
    }

    bigSchema.push(schemaLine)
    y++;
}

//Time to find adjacent to the symbols in the big schema, and mark those parts adjacent
for (var [y, line]  of bigSchema.entries())
{
   for (var [x, square] of line.entries())
   {
    var symb = square.Type as Gear;
    if (symb.isGear)
    {
        markNeighbors(x, y, bigSchema);
    }
   } 
}

//Sum it all up

var uniqueParts: Part[] = [];
for (var line of bigSchema)
{
   for (var square of line)
   {
    var gear = square.Type as Gear;
    if (gear.isGear)
    {
        if (gear.neighbors.length != 2)
            continue;

        var firstNeighbor = +gear.neighbors[0].num;
        var secondNeighbor = +gear.neighbors[1].num;
        sum += firstNeighbor*secondNeighbor;
    }
   }
}


function markNeighbors(x: number, y: number, schema: Square[][])
{
    //above = y-1; x-1, x, x+1
    //sides = y; x-1, x+1
    //below = y+1; x-1, x, x+1
    var gear = schema[y][x].Type as Gear;
    var values = [-1,0,+1];
    var neighborsToCheck: {Y: number, X: number}[] = [];
    const maxSize = schema.length - 1;

    //First create all combinations that we need to mark, we don't want to mark squares outside the board
    for (var yValue of values)
    {
        var possibleYValue = yValue + y;
        if (possibleYValue < 0)
            continue;
        if (possibleYValue > maxSize)
            continue;
        for (var xValue of values)
        {
            var possibleXValue = x + xValue;
            if (possibleXValue < 0)
                continue;
            if (possibleXValue > 139) //139 is the max width
                continue;
            if (possibleXValue == x && possibleYValue == y)
                continue;
            neighborsToCheck.push({ Y: possibleYValue, X: possibleXValue })
        }
    }
    //Then we mark them as adjacent if they are Parts
    for (const neighbor of neighborsToCheck)
    {
        getNeighbor(schema[neighbor.Y][neighbor.X], gear);
    }
}

function getNeighbor(square: Square, gear: Gear) 
{
    var part = square.Type as Part;
    if (!part.id)
        return;
    console.log(part);
    if (gear.neighbors.find((p) => p.id == part.id))
        return;
    gear.neighbors.push(part);
}
console.log("Result: " + sum);