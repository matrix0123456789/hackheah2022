import {WebSocketServer} from "ws";
import {Game} from "../game/game.js";

export const wsServer = new WebSocketServer({noServer: true});
wsServer.on('connection', (socket, req) => {
    console.log('tukej', req.url.split('/'));
    let [_,id] = req.url.split('/');
    let game = Game.get(+id);
    let player = game.addPlayer(socket);
    player.send('allData', {currentPlayer: player.allDataToJson(), game: game.allDataToJson()})
    socket.on('message', message => console.log(message));
});

export function sendWebsocketMessage(type, data) {
    wsServer.clients.forEach(x => x.send(JSON.stringify({type, data})))
}
