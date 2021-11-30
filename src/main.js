import fs from 'fs'
import readline from 'readline'
import chalk from 'chalk'
import utility from './utility.js'
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
// name str agi hp
let myPlayer = new Player('Chris', 22, 20, 46);

// name str agi hp gold
let enemy = new Mob('scorpion', 18, 16, 20, 15);

let rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

// Determines if the monster does lesser damage, or more damage.
function isWeakEnemy() {
    let out = false;
    let enemyStrength = enemy.str / 4;
    let heroDefense = (myPlayer.defense() / 4) + 1;
    if(enemyStrength < heroDefense) {
        out = true;
    }
    return out;
}

function enemyAttack() {
    let enemyAttack = 0;
    let lowerDamageLimit;
    let upperDamageLimit;
    let heroDefense;
    if(isWeakEnemy()) {
        // floor((((EnemyStrength + 2) * RAND + 1024) >> 9) / 3)
        upperDamageLimit = (enemy.str + 4) / 6;
        enemyAttack = utility.randomIntFromInterval(0, upperDamageLimit - 1);
    } else {
        /*
        COMPLEX FORMULA:
        ((256 + RAND) * (EnemyStrength - (HeroDefense >> 1) + 1) - 256) >> 10

        EASIER FORMULA:
        (EnemyStrength - HeroDefense / 2) / 4,
        to
        (EnemyStrength - HeroDefense / 2) / 2

        The hero's defense is equal to his agility / 2 rounded down, plus the modifiers
        for his equipment.
        */

        lowerDamageLimit = (enemy.str - myPlayer.defense() / 2) / 4;
        upperDamageLimit = (enemy.str - myPlayer.defense() / 2) / 2;

        enemyAttack = utility.randomIntFromInterval(lowerDamageLimit, upperDamageLimit - 1);

    }

    if(enemyAttack < 1) {
        enemyAttack = utility.randomIntFromInterval(0,1);
    }
    if(enemyAttack >= myPlayer.hp) {
        myPlayer.hp = 0;
        console.log(`The ${enemy.name} strikes for ${enemyAttack} damage. You die.`);
    } else {
        myPlayer.hp -= enemyAttack;
        console.log(`The ${enemy.name} strikes you for ${enemyAttack} damage.`);
    }
}

function heroRegularAttack() {
    if(enemy.hp > 0) {
        let lowerAttackLimit = (myPlayer.str - enemy.agi / 2) / 4;
        let upperAttackLimit = (myPlayer.str - enemy.agi / 2) / 2;
        let myAttack = utility.randomIntFromInterval(lowerAttackLimit, upperAttackLimit);
        if(myAttack < 1) {
            myAttack = utility.randomIntFromInterval(0,1);
        }
        if(myAttack >= enemy.hp) {
            enemy.hp = 0;
            console.log(`You strike the ${enemy.name} for ${myAttack} damage. The scorpion dies.`);
        } else {
            enemy.hp -= myAttack;
            console.log(`You strike the ${enemy.name} for ${myAttack} damage.`);
        }
    } else {
        console.log(`You flog the ${enemy.name}'s lifeless body once more.`);
    }
}

function waitForUserInput() {
  rl.question("Command: ", function(answer) {
    if (answer == "exit"){
        rl.close();
    } else if (answer == '?' || answer == 'help') {
        console.log("Available commands: help, ?, fight, status, exit");
        waitForUserInput();
    } else if(answer == 'fight') {
        if(myPlayer.hp > 0) {
            heroRegularAttack();
            if(enemy.hp > 0) {
                enemyAttack();
            }
        } else {
            console.log("You are dead.");
        }
        waitForUserInput();
    } else if(answer == 'status') {
        console.log(myPlayer.print());
        console.log(enemy.print());
        waitForUserInput();
    } else {
        waitForUserInput();
    }
  });
}

waitForUserInput();
