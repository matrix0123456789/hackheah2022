<template>
  <div class="games-list-widget">
    <div class="wrapper">
      <button @click="createGame" class="create-button">
        Utwórz grę
      </button>
      <template v-if="games.length">
        <div class="gameInfo" v-for="game in games" @click="joinGame(game.id)">
          <div class="number">{{ game.id }}.</div>
          <div class="players" :class="{ disabled: game.players.length >= 4 }">
            <div class="title">Gracze</div>
            <div class="list">
              <div v-for="player in game.players" class="player">
                {{ player.name }}
              </div>
            </div>
          </div>
          <button :class="{ disabled: game.players.length >= 4 }" :disabled="game.players.length >= 4">
            Dołącz
          </button>
        </div>
      </template>
      <div v-else>
        <div class="no-games">Brak aktualnie prowadzonych gier</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useWebsocketStore } from '@/stores/websocketStore'
import connecting from "@/components/Connecting.vue";

export default {
  name: "GamesList",
  data() {
    return {
      websocketStore: useWebsocketStore()
    }
  },
  computed: {
    games() {
      return this.websocketStore.games;
    }
  },
  methods: {
    createGame() {
      this.websocketStore.createGame();
    },
    joinGame(id) {
      this.websocketStore.joinGame(id);
    }
  },
  mounted() {
    console.log("---", this.games)
  }
}
</script>

<style scoped lang="scss">
.games-list-widget {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-size: 40px;
  position: relative;

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

    .no-games {
      font-size: 22px;
    }

    .create-button {
      margin-bottom: 20px;
    }

    .gameInfo {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 5px 10px;
      border: 1px solid white;
      border-radius: 5px;
      width: calc(100% - 40px);

      .number {
        margin-right: 10px;
        font-size: 28px;
      }

      .players {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-right: 20px;
        font-size: 16px;

        .list {
          display: flex;
        }
      }
    }
  }
}
</style>
