import fs from 'fs'
import readline from 'readline'
import chalk from 'chalk'
import Player from './player.js'
import Mob from './mob.js'

//let myPlayer = new Player('Chris', 10, 5, 12);
//console.log(myPlayer.print());

/*
fs.readFile('./src/map.txt','utf-8',(err,data)=>{
    if (err) throw err
    console.log(chalk.red(data));
})
*/

// level 8 Player
let myPlayer = new Player('Chris', 22, 20, 46);

// name str agi hp gold
let scorpion = new Mob('Scorpion', 18, 16, 20, 15);

let rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

// Determines if the monster does lesser damage, or more damage.
function doLesserDamage() {
    let out = false;
    let enemyStrength = scorpion.str / 4;
    let heroDefense = (myPlayer.defense() / 4) + 1;
    if(enemyStrength < heroDefense)) {
        out = true;
    }
    return out;
}

function attackMonster() {

}

function waitForUserInput() {
  rl.question("Command: ", function(answer) {
    if (answer == "exit"){
        rl.close();
    } else if (answer == '?' || answer == 'help') {
        console.log("Available commands: help, ?, fight, status, exit");
        waitForUserInput();
    } else if(answer == 'fight') {
        this.attackMonster();
        waitForUserInput();
    } else if(answer == 'status') {
        console.log(myPlayer.print());
        console.log(scorpion.print());
        waitForUserInput();
    } else {
        waitForUserInput();
    }
  });
}

waitForUserInput();
