function sayHi(user) {
    console.log(`Hello, ${user}!`);
}

function sayGoodbye() {
    console.log(`${Date.now()} - time to say goodbye!`);
}

export {
    sayHi,
    sayGoodbye
};
