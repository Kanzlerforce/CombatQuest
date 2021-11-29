import utility from './utility.js'

console.log('Random Int From Interval Tests:');
console.log(`utility.randomIntFromInterval(0,100): ${utility.randomIntFromInterval(0, 100)}`);
console.log(`utility.randomIntFromInterval(75,100): ${utility.randomIntFromInterval(75, 100)}`);
console.log(`utility.randomIntFromInterval(0,1): ${utility.randomIntFromInterval(0, 1 )}`);

console.log('\nComplex vs Easy Attack Results:');
let myPlayer = {
    str: 22
}
let scorpion = {
    agi: 16
}

let hard = {};
let easy = {};

for (let i = 0; i < 100; i++) {
    let hardToDecipherAttack = ((utility.rand() + 256) * (myPlayer.str - (scorpion.agi >> 1))) >> 10;
    //hardToDecipherAttack in hard ? hard[hardToDecipherAttack]
    hard[hardToDecipherAttack] = hard[hardToDecipherAttack] ? hard[hardToDecipherAttack] + 1 : 1;

    let easyAttackLow = (myPlayer.str - scorpion.agi / 2) / 4;
    let easyAttackHigh = (myPlayer.str - scorpion.agi / 2) / 2;
    let easyAttack = utility.randomIntFromInterval(easyAttackLow, easyAttackHigh - 1);
    easy[easyAttack] = easy[easyAttack] ? easy[easyAttack] + 1 : 1;
}

console.log(hard);
for (const key in hard) {
    console.log(`${key}: ${utility.histogram(hard[key])}`);
}

console.log("");
console.log(easy);
for (const key in easy) {
    console.log(`${key}: ${utility.histogram(easy[key])}`);
}
