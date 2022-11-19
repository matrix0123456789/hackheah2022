export class Player {
    name = '';
    position = 0;
    money = 0;

    constructor(id, socket) {
        this.id = id;
        this.socket = socket;
    }

    static allPlayers = new Map();
    static currentId = 1;

    static createPlayer(socket) {
        let player = new Player(this.currentId++, socket);
        this.allPlayers.set(player.id, player);
        return player;
    }

    allDataToJson() {
        return {id: this.id, name: this.name, position: this.position, money: this.money}
    }

    send(name, data) {
        this.socket.send(JSON.stringify({name, data}))
    }
}