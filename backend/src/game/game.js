import {Player} from "../player/player.js";
import {randomDice} from "../core/utils.js";
import {Windmill} from "../board/windmill.js";
import {Start} from "../board/start.js";
import {Village} from "../board/village.js";
import {Field} from "../board/field.js";
import {Leaderboard} from "../player/leaderboard.js";
import {Chance} from "../core/chance.js";
import {Tavern} from "../board/tavern.js";
import {Tax} from "../board/tax.js";
import {Resting} from "../board/resting.js";
import {Church} from "../board/church.js";

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
    currentTurnRolled = false;
    status = 'waiting';//waiting, playing, finished
    board = [new Start,
        new Village('Vlkolinec', 'slovakia', 60, 50, [2, 10, 30, 90, 160, 250]),
        new Tax(),
        new Village('Havranok', 'slovakia', 60, 50, [4, 20, 60, 180, 320, 450]),
        new Field(),
        new Windmill(),
        new Village('Cisnadioara', 'romania', 100, 50, [6, 30, 90, 270, 400, 550]),
        new Chance(),
        new Village('Atel', 'romania', 100, 50, [6, 30, 90, 270, 400, 550]),
        new Village('Selistat', 'romania', 120, 50, [8, 40, 100, 300, 450, 600]),
        new Resting(),
        new Village('Koruna', 'czekia', 140, 100, [10, 50, 150, 450, 625, 750]),
        new Church(),
        new Village('Vortova', 'czekia', 140, 100, [10, 50, 150, 450, 625, 750]),
        new Village('Veprikov', 'czekia', 160, 100, [12, 60, 180, 500, 700, 900]),
        new Windmill(),
        new Village('Ujsolt', 'hungary', 180, 100, [14, 70, 200, 550, 750, 950]),
        new Tavern(),
        new Village('Tabdi', 'hungary', 180, 100, [14, 70, 200, 550, 750, 950]),
        new Village('Kiskore', 'hungary', 200, 100, [16, 80, 220, 600, 800, 1000]),
        new Field(),
        new Village('Krumbach', 'austria', 220, 150, [18, 90, 250, 700, 875, 1050]),
        new Chance(),
        new Village('Untereck', 'austria', 220, 150, [18, 90, 250, 700, 875, 1050]),
        new Village('Salmannsdorf', 'austria', 240, 150, [20, 100, 300, 750, 925, 1100]),
        new Windmill(),
        new Village('Ором', 'ukraine', 260, 150, [22, 110, 330, 800, 975, 1150]),
        new Village('Бечеi', 'ukraine', 260, 150, [22, 110, 330, 800, 975, 1150]),
        new Field(),
        new Village('Купiль', 'ukraine', 280, 260, [24, 120, 360, 850, 1025, 1200]),
        new Tax(),
        new Village('Olesno', 'poland', 300, 200, [26, 130, 390, 900, 1100, 1275]),
        new Village('Ostrow', 'poland', 300, 200, [26, 130, 390, 900, 1100, 1275]),
        new Tavern(),
        new Village('Kluczbork', 'poland', 320, 200, [28, 150, 450, 1000, 1200, 1400]),
        new Windmill(),
        new Chance(),
        new Village('Ердеч', 'serbia', 350, 200, [35, 175, 500, 1100, 1300, 1500]),
        new Church(),
        new Village('Секурич', 'serbia', 400, 200, [50, 200, 600, 1400, 1700, 2000]),
        new Village('Секурич', 'serbia', 400, 200, [50, 200, 600, 1400, 1700, 2000]),]

    constructor(id) {
        this.id = id;
    }

    allDataToJson() {
        return {
            id: this.id,
            players: this.players.map(x => x.allDataToJson()),
            board: this.board.map(x => x.allDataToJson()),
            status: this.status,
            currentTurn: this.players[this.currentTurnIndex].id,
            currentTurnRolled: this.currentTurnRolled
        }
    }

    addPlayer(socket, username) {
        let colors = ['red', 'green', 'blue', 'yellow']
        let player = Player.createPlayer(socket, username)
        for (const color of colors) {
            if (!this.players.some(x => x.color == color)) {
                player.color = color;
                break;
            }
        }
        this.players.push(player);
        this.updateAll();
        return player;
    }

    start() {
        if (this.status == 'waiting' && this.players.length >= 2) {
            this.status = 'playing';
            this.updateAll();
        }
    }

    rollDice(player) {
        if (this.players[this.currentTurnIndex] != player) return;
        if (this.status != 'playing') return;
        if (this.currentTurnRolled) return;

        let random = [randomDice(), randomDice()]
        let randomSum = random[0] + random[1];
        this.currentTurnRolled = true;
        player.position += randomSum;
        if (player.position > this.board.length) {
            player.position %= this.board.length;
            player.money += 200;
        }
        let pause = this.board[player.position].steppedIn(player, this);
        if (!pause) {
            this.currentTurnIndex = (this.currentTurnIndex + 1) % this.players.length;
            this.currentTurnRolled = false;
        }
        this.updateAll()
    }

    updateAll() {
        for (const player of this.players) {
            player.send('allData', {currentPlayer: player.allDataToJson(), game: this.allDataToJson()})
        }
    }

    setMyName(player, name) {
        player.name = name;
        this.updateAll();
    }

    banById(playerId) {
        let player = this.players.find(x => x.id == playerId);
        this.ban(player)
    }

    ban(player) {

        let index = this.players.indexOf(player);

        console.log('ban', index)
        if (index >= 0) {
            this.players.splice(index, 1);
            if (this.currentTurnIndex == index) {
                this.nextPlayer(player)
            }
            if (this.players.length == 0) {
                Game.allGames.delete(this.id)
            }
            this.updateAll();
        }
    }

    nextPlayer(player) {
        if (this.players[this.currentTurnIndex] != player) return;
        if (this.status != 'playing') return;

        do {
            this.currentTurnIndex = (this.currentTurnIndex + 1) % this.players.length;
            this.currentTurnRolled = false;
        } while (this.players[this.currentTurnIndex].money < 0);
        this.updateAll();
    }

    buyCurrent(player) {
        if (this.players[this.currentTurnIndex] != player) return;
        if (this.status != 'playing') return;
        if (!this.currentTurnRolled) return;
        let field = this.board[player.position]
        if ((field instanceof Village || field instanceof Windmill) && field.owner == null) {
            if (player.money >= field.price) {
                player.money -= field.price;
                field.owner = player;
            }
            this.nextPlayer(player)
        }
    }

    bancrupt(bancrupt, next) {
        if (bancrupt.money < 0) {
            for (const field of this.board) {
                if (field.owner == bancrupt) {
                    field.owner = next;
                }
            }

            this.players.forEach(x => x.send('bancrupt', {playerId: player.id}))
        }
        if (this.players.filter(x => x.money >= 0).length == 1) {
            this.status = 'finished'
            let winner = this.players.filter(x => x.money >= 0)[0]
            Leaderboard.add(winner.name, winner.money)
        }
    }

    buildHouse(player, data) {
        let field = this.board[player.position]

        if (field.owner == player && player.money >= field.housePrice && field.houseCount < 5) {
            field.houseCount++;
            player.money -= field.housePrice;
            this.updateAll()
        }
    }
}