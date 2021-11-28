const Player = class {
    constructor(name, str, agi, hp){
        this.name = name
        this.str = str;
        this.agi = agi;
        this.hp = hp;
    }

    print() {
        return `Name: ${this.name}\nSTR: ${this.str}\nAGI: ${this.agi}\nHP: ${this.hp}\n`;
    }
}

export default Player;
