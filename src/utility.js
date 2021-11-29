const utility = {
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
