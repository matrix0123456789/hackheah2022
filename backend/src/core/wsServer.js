import {WebSocketServer} from "ws";

export const wsServer = new WebSocketServer({noServer: true});
wsServer.on('connection', socket => {
    socket.on('message', message => console.log(message));
});

export function sendWebsocketMessage(type, data) {
    wsServer.clients.forEach(x => x.send(JSON.stringify({type, data})))
}
