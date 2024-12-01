"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var data = fs.readFileSync('./input.txt', 'utf8');
var lines = data.split('\n');
var sum = 0;
var sortedListL = [];
var sortedListR = [];
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var l = lines_1[_i];
    var leftRight = l.split("   ");
    var left = leftRight[0];
    var right = leftRight[1];
    sortedListL.push(Number(left));
    sortedListR.push(Number(right));
}
sortedListL.sort(function (a, b) { return Number(a) - Number(b); });
sortedListR.sort(function (a, b) { return Number(a) - Number(b); });
for (var i = 0; i < sortedListL.length; i++) {
    var diff = Math.abs(sortedListL[0] - sortedListR[0]);
    sum += diff;
}
console.log("Result: " + sum);
