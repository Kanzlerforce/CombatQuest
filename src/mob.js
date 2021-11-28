import utility from './utility.js'

const Mob = class {
    constructor(name, str, agi, hp, gp){
        this.name = name
        this.str = str;
        this.agi = agi;
        this.hp = this.calcHp(hp);
        this.gp = this.calcGp(gp);
    }

    //  range from 75.1-100% of the hp value
    calcHp(hp) {
        return hp - ((utility.rand() * hp) >> 10);
    }

    // range from 75-99.9% of the gp
    calcGp(gp) {
        return (gp * ((utility.rand(64)) + 192)) >> 8;
    }

    print() {
        return `Name: ${this.name}\nHP: ${this.hp}\n`;
    }
}

export default Mob;
