<template>
  <div class="games-list-widget">
    <button @click="createGame">
      Utwórz gre
    </button>
    <div v-if="games.length">
      <div class="gameInfo" v-for="game in games" >
        {{ getGameName(game) }}
      </div>
    </div>
    <div v-else>
      <div>Brak aktualnie prowadzonych gier</div>
    </div>
  </div>
</template>

<script>
import {useWebsocketStore} from '@/stores/websocketStore'
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
    getGameName(game){
      return game.id + "[" + game.players.map(function( player ) {
        return player.name;
      }).join(', ') + "]";
    }
  },
  mounted() {
    console.log("---", this.games)
  }
}
</script>

<style scoped>
.games-list-widget {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-size: 40px;
}
</style>
