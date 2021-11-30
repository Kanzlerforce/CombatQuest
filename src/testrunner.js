import { TestLibrary } from './testlibrary.js'
import * as dummy from './dummytestlibrary.js'

let test = {
    testLib: 1,
    add: 1,
    randomIntervalTest: 0,
    heroRegularAttack: 0,
    enemyWeakAttack: 0,
    enemyRegularAttack: 0,
    dummyTests: 1,
}

if(test.testLib) {
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
}

if(test.dummyTests) {
    dummy.sayHi("Chris");
    dummy.sayGoodbye();
}
