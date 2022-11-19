import {Player} from "../player/player.js";
import {randomDice} from "../core/utils.js";
import {Windmill} from "../board/windmill.js";
import {Start} from "../board/start.js";
import {Village} from "../board/village.js";
import {Field} from "../board/field.js";

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
        new Village('Vlkolinec', 'slovakia'),
        new Field(),
        new Village('Havranok', 'slovakia'),
        new Windmill(),
        new Field(),
        new Village('Cisnadioara', 'romania'),
        new Chance(),
        new Village('Atel', 'romania'),
        new Village('Selistat', 'romania'),
        new Field(),
        new Village('Koruna', 'czekia'),
        new Field(),
        new Village('Vortova', 'czekia'),
        new Village('Veprikov','czekia'),
        new Windmill(),
        new Village('Ujsolt','hungary'),
        new Field(),
        new Village('Tabdi', 'hungary'),
        new Village('Kiskore', 'hungary'),
        new Field(),
        new Village('Krumbach', 'austria'),
        new Chance(),
        new Village('Untereck', 'austria'),
        new Village('Salmannsdorf', 'austria'),
        new Windmill(),
        new Village('Ором', 'ukraine'),
        new Village('Бечеi', 'ukraine'),
        new Field(),
        new Village('Купiль', 'ukraine'),
        new Field(),
        new Village('Olesno', 'poland'),
        new Village('Ostrow', 'poland'),
        new Field(),
        new Village('Kluczbork', 'poland'),
        new Windmill(),
        new Chance(),
        new Village('Ердеч', 'serbia'),
        new Field(),
        new Village('Секурич', 'serbia'),
    ]

    constructor(id) {
        this.id = id;
    }

    allDataToJson() {
        return {
            id: this.id,
            players: this.players.map(x => x.allDataToJson()),
            board: this.board.map(x => x.allDataToJson()),
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

    ban(playerId) {
        let player = this.players.find(x => x.id == playerId);
        let index = this.players.indexOf(player);
        if (index >= 0) {
            this.players.splice(index, 1);
            if (this.currentTurnIndex == index) {
                this.nextPlayer(player)
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
        } while (this.players[this.currentTurnIndex].money >= 0);
        this.updateAll();
    }

    buyCurrent(player) {
        if (this.players[this.currentTurnIndex] != player) return;
        if (this.status != 'playing') return;
        if (!this.currentTurnRolled) return;
        let field = this.board[player.position]
        if (field instanceof Village && field.owner == null) {
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
        }
        if (this.players.filter(x => x.money >= 0).length == 1) {
            this.status = 'finished'
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