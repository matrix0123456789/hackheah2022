export class Player {
    name = '';
    position = 0;
    money = 1500;
    color = '';

    constructor(id, socket, name) {
        this.id = id;
        this.socket = socket;
        this.name = name
    }

    static allPlayers = new Map();
    static currentId = 1;

    static createPlayer(socket, username) {
        let player = new Player(this.currentId++, socket, username);
        this.allPlayers.set(player.id, player);
        return player;
    }

    allDataToJson() {
        return {id: this.id, name: this.name, position: this.position, money: this.money, color: this.color}
    }

    send(name, data) {
        this.socket.send(JSON.stringify({name, data}))
    }
}