import fs from 'fs'
import chalk from 'chalk'
import Player from './player.js'

let myPlayer = new Player('Chris', 10, 5, 12);
console.log(myPlayer.print());

fs.readFile('./src/map.txt','utf-8',(err,data)=>{
    if (err) throw err
    console.log(chalk.red(data));
})
