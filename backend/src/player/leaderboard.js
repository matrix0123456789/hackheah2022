import * as fs from "fs";

export const Leaderboard = {
    add(name, money) {
        fs.writeFileSync('./leaderboard.json', JSON.stringify({name, money, stamp: +new Date()}) + ',');
    }
}