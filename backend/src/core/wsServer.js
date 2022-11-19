import {WebSocketServer} from "ws";
import {Game} from "../game/game.js";

export const wsServer = new WebSocketServer({noServer: true});
wsServer.on('connection', (socket, req) => {
    try {
        let game = null;
        let player = null;
        socket.send(getAllGamesMessage());
        socket.on('message', message => {
            try {
                console.log(message);
                let {name, data} = JSON.parse(message.toString('utf8'));

                if (name == 'start') {
                    game.start();

                } else if (name == 'rollDice') {
                    game.rollDice(player);

                } else if (name == 'setMyName') {
                    game.setMyName(player, data);

                } else if (name == 'ban') {
                    game.ban(data);
                } else if (name == 'skipTurn') {
                    game.nextPlayer(player);
                } else if (name == 'buyCurrent') {
                    game.buyCurrent(player);
                } else if (name == 'buildHouse') {
                    game.buildHouse(player, data);
                } else if (name == 'joinGame') {
                    game = Game.get(data);
                    player = game.addPlayer(socket);
                }
            } catch (ex) {
                console.error(ex);
            }
        });
    } catch (ex) {
        console.error(ex)
    }
});

function getAllGamesMessage() {
    return JSON.stringify({
        name: 'allGames',
        data: [...Game.allGames].map(([n, g]) => {
            return {id: g.id, players: g.players?.length};
        })
    });
}

export function sendGamesListToEverybody() {
    let message = getAllGamesMessage()

    wsServer.clients.forEach(x => x.send(message));

}
