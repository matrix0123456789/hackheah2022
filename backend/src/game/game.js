import {Player} from "../player/player.js";

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

    constructor(id) {
        this.id = id;
    }

    allDataToJson() {
        return {
            id: this.id,
            players: this.players.map(x => x.allDataToJson()),
            currentTurnIndex:this.currentTurnIndex
        }
    }

    addPlayer(socket) {
        let player = Player.createPlayer(socket)
        this.players.push(player);
        return player;
    }
}