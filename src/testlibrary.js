import utility from './utility.js'

export class TestLibrary {
    constructor() {

    }

    chanceIn64(chance) {
        let tally = {
            hits: 0,
            dodges: 0
        }
        let randomNumber;
        chance = chance - 1;
        for (var i = 0; i < 64; i++) {
            randomNumber = utility.rand(64); // random number betwee 0 and 63
            // chance | randomNumber    |    randomNumber <= chance
            // --------------------------------------------------
            //   -1     0                   false
            //    0     0, 1, 2             true, false, false...
            //    1     0, 1, 2             true, true, false...
            if (randomNumber <= chance) {
                tally.dodges += 1;
            } else {
                tally.hits += 1;
            }
        }

        console.log(`hits: ${tally.hits}`);
        console.log(`dodges: ${tally.dodges}`);
    }

    add(x=2, y=2) {
        console.log('Test: add()');
        console.log(`x: ${x} y: ${y}`);
        console.log(x + y);
        console.log("");
    }

    randomIntervalTest() {
        console.log('Test: randomIntervalTest()');
        console.log(`0 to 100: ${utility.randomIntFromInterval(0, 100)}`);
        console.log(`75 to 100: ${utility.randomIntFromInterval(75, 100)}`);
        console.log(`0 to 1: ${utility.randomIntFromInterval(0, 1 )}`);
        console.log("");
    }

    heroRegularAttack() {
        console.log('Test: heroRegularAttack()');
        let myPlayer = {
            str: 22,
            agi: 20,
        }
        let scorpion = {
            str: 18,
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

        console.log("\nRegular attack using the hard-to-understand algorithm");
        console.log(hard);
        for (const key in hard) {
            console.log(`${key}: ${utility.histogram(hard[key])}`);
        }

        console.log("\nRegular attack using the easy-to-understand algorithm");
        console.log(easy);
        for (const key in easy) {
            console.log(`${key}: ${utility.histogram(easy[key])}`);
        }
    }

    enemyWeakAttack() {
        console.log('Test: enemyWeakAttack()');
        let player = {
            str: 22,
            agi: 20,
        }
        let enemy = {
            str: 18,
            agi: 16
        }

        let easyMin = -1;
        let easyMax = 0;
        let complexMin = -1;
        let complexMax = 0;

        let rand255;
        let complex;
        let max;
        let easy;

        for(let i = 0; i< 100000; i++) {
            rand255 = utility.rand();
            complex = Math.floor((((enemy.str + 2) * rand255 + 1024) >> 9) / 3);
            if(complexMin == -1) complexMin = complex;
            if(complex < complexMin) complexMin = complex;
            if(complex > complexMax) complexMax = complex;

            max = (enemy.str + 4) / 6;
            easy = utility.randomIntFromInterval(0, max - 1);
            if(easyMin == -1) easyMin = easy;
            if(easy < easyMin) easyMin = easy;
            if(easy > easyMax) easyMax = easy;
        }

        console.log(`complex calculation: min=${complexMin} max=${complexMax}`);
        console.log(`easy calculation: min=${easyMin} max=${easyMax}`);
    }

    enemyRegularAttack() {
        console.log('Test: enemyRegularAttack()');
        // ((256 + RAND) * (EnemyStrength - (HeroDefense >> 1) + 1) - 256) >> 10
        /*
        (EnemyStrength - HeroDefense / 2) / 4,

        to:

        (EnemyStrength - HeroDefense / 2) / 2

        The hero's defense is equal to his agility / 2 rounded down, plus the modifiers
        for his equipment.
        */
        let player = {
            str: 22,
            agi: 20,
        }
        let enemy = {
            str: 18,
            agi: 16
        }

        let easyMin = -1;
        let easyMax = 0;
        let complexMin = -1;
        let complexMax = 0;

        let rand255;
        let complex;
        let min;
        let max;
        let easy;

        let heroDefense = Math.floor(player.agi / 2);

        for(let i = 0; i< 100000; i++) {
            rand255 = utility.rand();
            complex = ((256 + rand255) * (enemy.str - (heroDefense >> 1) + 1) - 256) >> 10;
            if(complexMin == -1) complexMin = complex;
            if(complex < complexMin) complexMin = complex;
            if(complex > complexMax) complexMax = complex;

            min = (enemy.str - heroDefense / 2) / 4;
            max = (enemy.str - heroDefense / 2) / 2;

            easy = utility.randomIntFromInterval(min, max - 1);
            if(easyMin == -1) easyMin = easy;
            if(easy < easyMin) easyMin = easy;
            if(easy > easyMax) easyMax = easy;
        }

        console.log(`complex calculation: min=${complexMin} max=${complexMax}`);
        console.log(`easy calculation: min=${easyMin} max=${easyMax}`);

    }

}
