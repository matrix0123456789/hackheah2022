import {sendGamesListToEverybody, wsServer} from "./wsServer.js";
import express from "express";
import {Game} from "../game/game.js";

console.log('Backend of winning team is starting...')


const app = express()
const port = 3000


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('X-Version', process.env?.VERSION ?? 'null')
    //res.setHeader('Access-Control-Allow-Origin', '*')
    next();
});




const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});
