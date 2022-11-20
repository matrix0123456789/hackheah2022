<template>
  <main>
    <ConnectionError v-if="connectionError"/>
    <div v-else>
      <Connecting v-if="connecting"/>
      <div v-else-if="connected">
        <AppContent/>
      </div>
      <div v-else>
        <Login @onLogin="connect"/>
      </div>
    </div>
  </main>
</template>

<script>
import Connecting from "./components/Connecting.vue";
import ConnectionError from "@/components/ConnectionError.vue";
import {useWebsocketStore} from '@/stores/websocketStore'
import {useNavigatorStore} from '@/stores/navigator'
import AppContent from "@/components/AppContent.vue";
import Login from "@/components/Login.vue";

// Create WebSocket connection.

export default {
  data() {
    return {
      connecting: false,
      connected: false,
      connectionError: false,
      websocketStore: useWebsocketStore(),
      navigator: useNavigatorStore(),
    }
  },
  components: {
    Login,
    AppContent,
    ConnectionError,
    Connecting
  },
  methods: {
    manageWsMessage(message) {
      console.log("manageWsMessage");

      switch (message.name) {
        case "allGames":
          console.log("allGames!!!");
          this.websocketStore.refreshGames(message.data);
          return;
        default:
          return;
      }
    },

    connect(username = '') {
      const ws = new WebSocket(this.websocketStore.websocketAddress + '/' + encodeURIComponent(username));
      this.connecting = false;

      ws.onopen = () => {
        console.log("open");
        this.connected = true;
        this.connecting = false;
        this.connectionError = false;
        this.websocketStore.setUserName(username);
        this.navigator.goToPage(this.navigator.pages.gamesList);
        // // subscribe to some channels
        // ws.send(JSON.stringify({
        //   //.... some message the I must send when I connect ....
        // }));
      };

      ws.onmessage = (e) => {
        console.log('Message:', e.data);
        let parsedData = JSON.parse(e.data);
        this.manageWsMessage(parsedData);
      };

      ws.onclose = (e) => {
        // console.log('Socket is closed. Reconnect will be attempted in 3 second.', e.reason);

        this.connected = false;
        this.connecting = false;
        this.navigator.goToPage(this.navigator.pages.home);
        ws.close();

        // setTimeout( () =>{
        //   this.connect();
        // }, 3000);
      };

      ws.onerror = (err) => {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        this.connected = false;
        this.connecting = false;
        this.connectionError = true;
        this.navigator.goToPage(this.navigator.pages.home);
        // ws.close();
      };
    }
  },
  mounted() {
    // this.connect();
  }
}
</script>


<style lang="scss">
header {
  line-height: 1.5;
}

body {
  margin: 0;
}
</style>
