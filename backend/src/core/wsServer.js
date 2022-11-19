import {WebSocketServer} from "ws";
import {Game} from "../game/game.js";

export const wsServer = new WebSocketServer({noServer: true});
wsServer.on('connection', (socket, req) => {
    console.log('tukej', req.url.split('/'));
    let [_, id] = req.url.split('/');
    let game = Game.get(+id);
    let player = game.addPlayer(socket);
    socket.on('message', message => {
        console.log(message);
        let {name, data} = JSON.parse(message.toString('utf8'));

        if (name == 'start') {
                game.start();

        } else if (name == 'rollDice') {
            game.rollDice(player);

        }else if (name == 'setMyName') {
            game.setMyName(player, data);

        }else if (name == 'ban') {
            game.ban(data);
        }
        else if (name == 'skipTurn') {
            game.nextPlayer(player);
        }
        else if (name == 'buyCurrent') {
            game.buyCurrent(player);
        }
        else if (name == 'buildHouse') {
            game.buildHouse(player, data);
        }
    });
});

export function sendWebsocketMessage(type, data) {
    wsServer.clients.forEach(x => x.send(JSON.stringify({type, data})))
}
