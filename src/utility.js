const utility = {
    // return a random number between 0 (inclusive) and max (exclusive).
    // Default return set is 0 to 255
    // Nodefault return set is 0 to max-1 (ie, for max = 64, you'd get 0 t0 63)
    rand: (max = 256) => {
        return Math.floor(Math.random() * max);
    },

    randomIntFromInterval: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    histogram: (n) => {
        let out = "";
        for(let i = 0; i < n; i++) {
            out = out + "*";
        }
        return out;
    }
}

export default utility;
