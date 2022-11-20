<template>
  <main>
    <ConnectionError v-if="websocketStore.connectionError" />
    <div v-else>
      <Connecting v-if="websocketStore.connecting" />
      <div v-else-if="websocketStore.connected">
        <AppContent />
      </div>
      <div v-else>
        <Login @onLogin="websocketStore.connect" />
      </div>
    </div>
  </main>
</template>

<script>
import Connecting from "./components/Connecting.vue";
import ConnectionError from "@/components/ConnectionError.vue";
import { useWebsocketStore } from '@/stores/websocketStore'

import AppContent from "@/components/AppContent.vue";
import Login from "@/components/Login.vue";

// Create WebSocket connection.

export default {
  data() {
    return {
      websocketStore: useWebsocketStore(),
    }
  },
  components: {
    Login,
    AppContent,
    ConnectionError,
    Connecting
  },
  methods: {

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
  font-family: 'Dancing Script', cursive;
  font-family: 'Nanum Gothic', sans-serif;

  button {
      background: rgb(106, 59, 8);
      background: linear-gradient(0deg, rgba(106, 59, 8, 1) 9%, rgba(219, 104, 36, 1) 100%);
      border-radius: 7px;
      border: 4px solid rgba(106, 59, 8, 1);
      border-top: none;
      border-bottom: 5px solid rgba(106, 59, 8, 1);
      padding: 5px 10px;
      font-size: 17px;
      font-weight: 700;
      color: white;
      transition: 200ms;
      cursor: pointer;

      &.disabled {
        background: gray;
        border: 4px solid gray;
        border-bottom: 5px solid gray;
        opacity: 0.7;
      }
    }
}
</style>
