<template>
  <main>
    <ConnectionError v-if="connectionError"/>
    <div v-else>
      <Connecting v-if="!connected"/>
      <div v-else>
        <AppContent/>
      </div>
    </div>
  </main>
</template>

<script>
import Connecting from "./components/Connecting.vue";
import ConnectionError from "@/components/ConnectionError.vue";
import { useWebsocketStore } from '@/stores/websocketStore'
import { useNavigatorStore } from '@/stores/navigator'
import AppContent from "@/components/AppContent.vue";

// Create WebSocket connection.

export default {
  data() {
    return {
      connected: false,
      connectionError: false,
      websocketStore: useWebsocketStore(),
      navigator: useNavigatorStore(),
    }
  },
  components: {
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
    connect() {
      const ws = new WebSocket(this.websocketStore.websocketAddress);

      ws.onopen =  () => {
        console.log("open");
        this.connected = true;
        this.connectionError = false;
        this.navigator.goToPage(this.navigator.pages.gamesList);
        // // subscribe to some channels
        // ws.send(JSON.stringify({
        //   //.... some message the I must send when I connect ....
        // }));
      };

      ws.onmessage =  (e) => {
        console.log('Message:', e.data);
        let parsedData = JSON.parse(e.data);
        this.manageWsMessage(parsedData);
      };

      ws.onclose =  (e) => {
        console.log('Socket is closed. Reconnect will be attempted in 3 second.', e.reason);
        this.connected = false;
        this.navigator.goToPage(this.navigator.pages.home);
        ws.close();

        setTimeout( () =>{
          this.connect();
        }, 3000);
      };

      ws.onerror =  (err) => {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        this.connected = false;
        this.connectionError = true;
        this.navigator.goToPage(this.navigator.pages.home);
        ws.close();
      };
    }
  },
  mounted() {
    this.connect();
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
