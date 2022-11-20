<template>
<div class="waiting-room-widget">
  <p>
    Oczekiwanie na graczy
  </p>
  <div class="player-info" v-for="player in players">
  {{player}}
  </div>
  <button :disabled="!canStartGame" v-if="isAdmin">
    Start
  </button>
</div>
</template>

<script>
import {useWebsocketStore} from "@/stores/websocketStore";

export default {
  name: "WaitingRoom",
  data() {
    return {
      websocketStore: useWebsocketStore()
    }
  },
  computed: {
    players() {
      return  this.websocketStore.allData.game.players;
    },
    canStartGame (){
      return this.websocketStore.allData.game.players.length > 1;
    },
    isAdmin(){
      return this.websocketStore.allData.game.players[0].id == this.websocketStore.allData.currentPlayer.id;
    },
  },
}
</script>

<style scoped>
.waiting-room-widget {
  position: fixed;
  background-color: red;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px   ;
}
</style>
