import fs from 'fs'
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

let running = true;
// level 8 Player
let myPlayer = new Player('Chris', 22, 20, 46);

// name str agi hp gold
let scorpion = new Mob('Scorpion', 18, 16, 20, 15);

while(running) {
    console.log(scorpion.print());
    running = false;
}
