import {ref, computed, reactive} from 'vue'
import {defineStore} from 'pinia'

export const useWebsocketStore = defineStore('websocketStore', () => {
    const _games = reactive([]);
    const websocketAddress = "ws://localhost:3000";
    const websocketAddressAPI = "http://localhost:3000";

    const games = computed(() => _games)

    function refreshGames(newGamesList) {
        while (_games.length)
            _games.pop();

        for (let newGame in newGamesList) {
            _games.push(newGame);
        }
    }

    return {websocketAddress,websocketAddressAPI, games, refreshGames}
})
