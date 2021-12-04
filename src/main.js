import fs from 'fs'
import readline from 'readline'
import chalk from 'chalk'
import utility from './utility.js'
import Player from './player.js'
import Mob from './mob.js'
import { enemies } from './data/enemies.js'

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
let myPlayer = new Player('Chris', 4, 5, 15);

// name str agi hp gold
let enemy = new Mob(enemies.ghost);

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

function chanceIn64(chance) {
    let randomNumber;
    chance = chance - 1;

    randomNumber = utility.rand(64); // random number betwee 0 and 63
    // chance | randomNumber   |    randomNumber <= chance
    // -------------------------------------------------
    //   -1     0                   false
    //    0     0, 1, 2             true, false, false...
    //    1     0, 1, 2             true, true, false...

    return randomNumber <= chance;
}

function enemyAttack() {
    let enemyAttack = 0;
    let lowerDamageLimit;
    let upperDamageLimit;
    let heroDefense;
    let msg = '';
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
    msg = `The ${enemy.name} attacks! Thy hit points decreased by ${enemyAttack}.`;
    if(enemyAttack >= myPlayer.hp) {
        myPlayer.hp = 0;
        console.log(`${msg} Thou hast been slain`);
    } else {
        myPlayer.hp -= enemyAttack;
        console.log(msg);
    }
}

function heroRegularAttack() {
    let msg = '';
    if(enemy.hp > 0) {
        if(chanceIn64(enemy.dodge)) {
            console.log(`${enemy.name} dodges your attack!`);
        } else {
            let lowerAttackLimit = (myPlayer.str - enemy.agi / 2) / 4;
            let upperAttackLimit = (myPlayer.str - enemy.agi / 2) / 2;
            let myAttack = utility.randomIntFromInterval(lowerAttackLimit, upperAttackLimit);
            if(myAttack < 1) {
                myAttack = utility.randomIntFromInterval(0,1);
            }
            console.log(`${myPlayer.name} attacks!`);
            msg = `The ${enemy.name}'s hit points have been reduced by ${myAttack}.`;
            if(myAttack >= enemy.hp) {
                enemy.hp = 0;
                console.log(`${msg} Thou hast done well in defeating the ${enemy.name}.`);
            } else {
                enemy.hp -= myAttack;
                console.log(msg);
            }
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
