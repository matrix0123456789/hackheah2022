<template>
  <div class="waiting-room-widget">
    <div class="wrapper">
      <p>
        Oczekiwanie na graczy...
      </p>
      <div class="players">
        <div class="player-info" v-for="player in players">
          {{ player.name }}
        </div>
      </div>

      <button :disabled="!canStartGame" v-if="isAdmin" @click="startGame">
        Start
      </button>
    </div>
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
      return this.websocketStore.allData.game.players;
    },
    canStartGame() {
      return this.websocketStore.allData.game.players.length > 1;
    },
    isAdmin() {
      return this.websocketStore.allData.game.players[0].id == this.websocketStore.allData.currentPlayer.id;
    },
  },
  methods: {
    startGame() {
      this.websocketStore.startGame();
    }
  }
}
</script>

<style scoped lang="scss">
.waiting-room-widget {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-size: 40px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/bg.png");
    background-repeat: no-repeat, repeat;
    background-size: cover;
    filter: grayscale(100%);
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    padding: 30px;
    border-radius: 5px;
    border: 3px solid #c1c1c1;
    background: #121212;
    color: white;
    max-height: calc(100vh - 100px);
    width: 500px;
    max-width: calc(100vw - 100px);
    overflow-y: auto;

    p {
      font-size: 28px;
      text-align: center;
    }

    .players {
      display: flex;
      flex-direction: column;
      font-size: 26px;
      margin-bottom: 30px;
    }
  }
}
</style>
