import utility from './utility.js'

const Mob = class {
    constructor(enemy) {
        this.name = enemy.name
        this.str = enemy.str;
        this.agi = enemy.agi;
        this.dodge = enemy.dodge;
        this.hp = this.calcHp(enemy.hp);
        this.gp = this.calcGp(enemy.gp);
    }

    //  range from 75.1-100% of the hp value
    // TODO: rewrite this into a more readable form
    calcHp(hp) {
        return hp - ((utility.rand() * hp) >> 10);
    }

    // range from 75-99.9% of the gp
    // TODO: rewrite this into a more readable form
    calcGp(gp) {
        return (gp * ((utility.rand(64)) + 192)) >> 8;
    }

    print() {
        return `Name: ${this.name}\nHP: ${this.hp}\n`;
    }
}

export default Mob;
