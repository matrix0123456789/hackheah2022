import {
    ref,
    computed,
    reactive
} from 'vue'
import {
    defineStore
} from 'pinia'
import {
    useNavigatorStore
} from '@/stores/navigator'

export const useWebsocketStore = defineStore('websocketStore', () => {
    const _games = reactive([]);
    const _allData = reactive({});
    const websocketAddress = "ws://localhost:3000";
    const websocketAddressAPI = "http://localhost:3000";
    const _userName = ref("");
    const _connecting = ref(false);
    const _connected = ref(false);
    const _connectionError = ref(false);
    const navigator = useNavigatorStore();
    const _randomResults = reactive({});
    const _toogleRandomResults = ref(true);

    const games = computed(() => _games)
    const allData = computed(() => _allData.value)
    const userName = computed(() => _userName.value)
    const connecting = computed(() => _connecting.value)
    const connected = computed(() => _connected.value)
    const connectionError = computed(() => _connectionError.value)
    const randomResults = computed(() => _randomResults.value)
    const toogleRandomResults = computed(() => _toogleRandomResults.value)

    let ws = null;

    function manageWsMessage(message) {
        console.log("manageWsMessage");

        switch (message.name) {
            case "allGames":
                console.log("allGames!!!");
                refreshGames(message.data);
                return;
            case "allData":
                console.log("allData!!!");
                loadGameView(message.data);
                return;
            case "randomResult":
                manageRandomResults(message.data);
                return;
            default:
                return;
        }
    }

    function rollDice() {
        if (!ws) {
            return;
        }

        ws.send(JSON.stringify({
            name: "rollDice"
        })); 
    }

    function manageRandomResults(res) {
        _randomResults.value = res;
        _toogleRandomResults.value = !_toogleRandomResults.value;
    }

    function connect(username = '') {
        ws = new WebSocket(websocketAddress + '/' + encodeURIComponent(username));
        window.dbg = ws;
        _connecting.value = false;

        ws.onopen = () => {
            console.log("open");
            _connected.value = true;
            _connecting.value = false;
            _connectionError.value = false;
            setUserName(username);
            navigator.goToPage(navigator.pages.gamesList);
        };

        ws.onmessage = (e) => {
            console.log('Message:', e.data);
            let parsedData = JSON.parse(e.data);
            manageWsMessage(parsedData);
        };

        ws.onclose = (e) => {
            _connected.value = false;
            _connecting.value = false;
            navigator.goToPage(navigator.pages.home);
            ws.close();
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

    function startGame() {
        if (!ws) {
            return;
        }

        ws.send(JSON.stringify({
            name: "start"
        }));
    }

    function createGame() {
        if (!ws) {
            return;
        }

        ws.send(JSON.stringify({
            name: "createGame"
        }));
    }

    function joinGame(id) {
        if (!ws) {
            return;
        }

        ws.send(JSON.stringify({
            name: "joinGame",
            data: id
        }));
    }

    function loadGameView(newAlleData) {
        _allData.value = newAlleData;
        // _allData = reactive(newAlleData.data);
        Object.assign(_allData, newAlleData.data);
        //
        // for (let prop in newAlleData.data){
        //     if(newAlleData.data.hasOwnProperty(prop)){
        //         _allData[prop] = newAlleData[prop];
        //     }
        // }

        if (newAlleData) {
            navigator.goToPage(navigator.pages.game);
        }
    }

    function refreshGames(newGamesList) {
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
        createGame,
        allData,
        joinGame,
        startGame,
        rollDice,
        randomResults,
        toogleRandomResults
    }
})