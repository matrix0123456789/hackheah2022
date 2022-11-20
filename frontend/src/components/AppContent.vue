<template>
  <div class="app-content">
    <WaitingRoom v-if="waitingForPlayers"></WaitingRoom>
    <MonopolyBoard v-if="currentPage == navigatorStore.pages.game"/>
    <GamesList v-else-if="currentPage == navigatorStore.pages.gamesList"/>
  </div>
</template>

<script>
import { useNavigatorStore } from '@/stores/navigator'
import MonopolyBoard from '../components/MonopolyBoard.vue';
import GamesList from "@/components/GamesList.vue";
import WaitingRoom from "@/components/WaitingRoom.vue";
import {useWebsocketStore} from "@/stores/websocketStore";

export default {
  name: "AppContent",
  components: {
    GamesList,
    MonopolyBoard,
    WaitingRoom,
  },
  data() {
    return {
      navigatorStore: useNavigatorStore(),
      websocketStore: useWebsocketStore(),
    }
  },
  computed: {
    waitingForPlayers (){
      return this.websocketStore.allData && this.websocketStore.allData.game && this.websocketStore.allData.game.status == "waiting";
    },
    currentPage(){
      return this.navigatorStore.currentPage;
    }
  },
  mounted() {
    console.log("sdds", this.navigatorStore.currentPage)
  }
}
</script>

<style scoped>
.app-content{

}
</style>
