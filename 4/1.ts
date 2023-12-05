import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\r\n');

var sum = 0;
for (var l of lines)
{
    var splitL = l.split(": ");
    var cardNumber = splitL[0];
    var restOfCard = splitL[1];
    var restSplit = restOfCard.split(" | ");

    var winners = restSplit[0].split(" ").filter((w) => w != ""); //Remove annoying double spaces
    var ourNumbers = restSplit[1].split(" ").filter((w) => w != "");

    var score = 0;
    for (var num of ourNumbers)
    {
        if (winners.includes(num))
        {
            console.log(num + " is in " + winners);
            if(score == 0)
            {
                score++;
                continue;
            } 
            score *= 2;
        }
    }
    sum += score;
}
console.log("Result: " + sum);

