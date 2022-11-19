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

        }
    });
});

export function sendWebsocketMessage(type, data) {
    wsServer.clients.forEach(x => x.send(JSON.stringify({type, data})))
}
