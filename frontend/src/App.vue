<template>
  <main>
    <ConnectionError v-if="websocketStore.connectionError"/>
    <div v-else>
      <Connecting v-if="websocketStore.connecting"/>
      <div v-else-if="websocketStore.connected">
        <AppContent/>
      </div>
      <div v-else>
        <Login @onLogin="websocketStore.connect"/>
      </div>
    </div>
  </main>
</template>

<script>
import Connecting from "./components/Connecting.vue";
import ConnectionError from "@/components/ConnectionError.vue";
import {useWebsocketStore} from '@/stores/websocketStore'

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
}
</style>
