import { TestLibrary } from './testlibrary.js'
import * as dummy from './dummytestlibrary.js'
import { enemies } from './data/enemies.js'

let test = {
    active: 1,
    add: 0,
    randomIntervalTest: 0,
    heroRegularAttack: 0,
    enemyWeakAttack: 0,
    enemyRegularAttack: 0,
    changeIn64: 1,
};
let dummyTests = 0;

if(test.active) {
    let testlib = new TestLibrary();

    if(test.add) {
        testlib.add();
        testlib.add(1,2);
    }

    if(test.randomIntervalTest) {
        for(let i = 0; i < 3; i++) {
            testlib.randomIntervalTest();
        }
    }

    if(test.heroRegularAttack) {
        testlib.heroRegularAttack();
    }

    if(test.enemyWeakAttack) {
        testlib.enemyWeakAttack();
    }

    if(test.enemyRegularAttack) {
        testlib.enemyRegularAttack();
    }

    if(test.changeIn64) {
        testlib.chanceIn64(enemies.ghost.dodge);
    }
}

if(dummyTests) {
    dummy.sayHi("Chris");
    dummy.sayGoodbye();
}
