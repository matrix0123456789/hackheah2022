import {ref, computed, reactive} from 'vue'
import {defineStore} from 'pinia'
import {useNavigatorStore} from '@/stores/navigator'

export const useWebsocketStore = defineStore('websocketStore', () => {
    const _games = reactive([]);
    const websocketAddress = "ws://localhost:3000";
    const websocketAddressAPI = "http://localhost:3000";
    const _userName = ref("");
    const _connecting = ref(false);
    const _connected = ref(false);
    const _connectionError = ref(false);
    const navigator = useNavigatorStore();

    const games = computed(() => _games)
    const userName = computed(() => _userName.value)
    const connecting = computed(() => _connecting.value)
    const connected = computed(() => _connected.value)
    const connectionError = computed(() => _connectionError.value)

    let ws = null;

    function manageWsMessage(message) {
        console.log("manageWsMessage");

        switch (message.name) {
            case "allGames":
                console.log("allGames!!!");
                refreshGames(message.data);
                return;
            default:
                return;
        }
    }

    function connect(username = '') {
        ws = new WebSocket(websocketAddress + '/' + encodeURIComponent(username));
        _connecting.value = false;

        ws.onopen = () => {
            console.log("open");
            _connected.value = true;
            _connecting.value = false;
            _connectionError.value = false;
            setUserName(username);
            navigator.goToPage(navigator.pages.gamesList);
            // // subscribe to some channels
            // ws.send(JSON.stringify({
            //   //.... some message the I must send when I connect ....
            // }));
        };

        ws.onmessage = (e) => {
            console.log('Message:', e.data);
            let parsedData = JSON.parse(e.data);
            manageWsMessage(parsedData);
        };

        ws.onclose = (e) => {
            // console.log('Socket is closed. Reconnect will be attempted in 3 second.', e.reason);

            _connected.value = false;
            _connecting.value = false;
            navigator.goToPage(navigator.pages.home);
            ws.close();

            // setTimeout( () =>{
            //   this.connect();
            // }, 3000);
        };

        ws.onerror = (err) => {
            console.error('Socket encountered error: ', err.message, 'Closing socket');
            _connected.value = false;
            _connecting.value = false;
            _connectionError.value = true;
            navigator.goToPage(navigator.pages.home);
            // ws.close();
        };
    }

    function createGame() {
        console.log("sddsdssdsd");
        if (!ws) {
            return;
        }

        ws.send(JSON.stringify({name: "createGame"}));
    }

    function refreshGames(newGamesList) {
        console.log("newGamesList", newGamesList);
        while (_games.length)
            _games.pop();

        for (let newGame of newGamesList) {
            _games.push(newGame);
        }
    }

    function setUserName(newUserName) {
        _userName.value = newUserName;
    }

    return {
        websocketAddress,
        websocketAddressAPI,
        games,
        refreshGames,
        userName,
        setUserName,
        connect,
        connecting,
        connected,
        connectionError,
        createGame
    }
})
