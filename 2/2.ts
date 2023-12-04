import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\r\n');
type Color = "blue" | "red" | "green"; 


var sum = 0;
for (var l of lines)
{
    var splitGameSeparator = l.split(": ");

    var gameIdData = splitGameSeparator[0];
    
    var turns = splitGameSeparator[1].split("; ");

    const largestColors: Record<Color, number> = {
        blue: 0,
        red: 0,
        green: 0
    };

    for (var t of turns)
    {
        var coloredCubes = t.split(", ");
        for (var cube of coloredCubes)
        {
            var csplit = cube.split(" ");
            var color = csplit[1] as Color;
            var number = +csplit[0];
            if (largestColors[color] < number)
            {
                largestColors[color] = number;
            }
        }
    }
    sum += largestColors.blue * largestColors.green * largestColors.red;
}

console.log("Result: " + sum);