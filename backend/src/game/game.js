import {Player} from "../player/player.js";
import {randomDice} from "../core/utils.js";

export class Game {
    static allGames = new Map();
    static currentId = 1;

    static newGame() {
        let game = new Game(this.currentId++)
        this.allGames.set(game.id, game)
        return game;
    }

    static get(id) {
        return this.allGames.get(id)
    }

    players = [];
    currentTurnIndex = 0;
    status = 'waiting';//waiting, playing, finished

    constructor(id) {
        this.id = id;
    }

    allDataToJson() {
        return {
            id: this.id,
            players: this.players.map(x => x.allDataToJson()),
            currentTurnIndex: this.currentTurnIndex
        }
    }

    addPlayer(socket) {
        let player = Player.createPlayer(socket)
        this.players.push(player);
        this.updateAll();
        return player;
    }

    start() {
        if (this.status == 'waiting') {
            this.status = 'playing';
            this.updateAll();
        }
    }

    rollDice(player) {
        if (this.players[this.currentTurnIndex] != player) return;
        if (this.status != 'playing') return;

        let random = [randomDice(), randomDice()]
        let randomSum = random[0] + random[1];

        player.position += randomSum;
        if (player.position > 40) {
            player.position %= 40;
            player.money += 200;
        }
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.players.length;
        this.updateAll()
    }

    updateAll() {
        for (const player of this.players) {
            player.send('allData', {currentPlayer: player.allDataToJson(), game: this.allDataToJson()})
        }
    }
}