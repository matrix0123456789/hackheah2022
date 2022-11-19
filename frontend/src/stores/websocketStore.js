import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWebsocketStore = defineStore('websocketStore', () => {
    const games = [];

    function refreshGames(newGamesList) {
        while(games.length)
            games.pop();

        for(let newGame in newGamesList){
            games.push(newGame);
        }
    }

    return { games, refreshGames}
})
