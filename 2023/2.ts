import * as fs from 'fs';

const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split('\r\n');

var sum = recursiveCardCounting(lines[0], lines, 0, false);
console.log(sum);

function recursiveCardCounting(currentCard: string, lines: string[], index: number, isUpcoming: boolean): number 
{
    if (!currentCard)
    {
        return 0;
    }
    if (index >= lines.length)
        return 0;

    var cardData = currentCard.split(": ");

    var restOfCard = cardData[1];
    var numberSplit = restOfCard.split(" | ");

    var winners = numberSplit[0].split(" ").filter((w) => w != ""); //Remove annoying double spaces
    var ourNumbers = numberSplit[1].split(" ").filter((w) => w != ""); //Remove annoying double spaces

    var matches = 0;
    for (var num of ourNumbers)
    {
        if (winners.includes(num))
            matches++;
    }

    var sum = 0;
    for (let i = 1; i <= matches; i++) {
        var nextIndex = index+i;
        if (nextIndex < lines.length)
        {
            sum += recursiveCardCounting(lines[nextIndex], lines, nextIndex, true);
        }
    }
    if (!isUpcoming && index + 1 < lines.length)
    {
        sum += recursiveCardCounting(lines[index+1], lines, index + 1, false);
    }
    return sum + 1;
}
