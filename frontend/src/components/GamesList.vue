<template>
  <div class="games-list-widget">
    <button @click="createGame">
      Utwórz gre
    </button>
    <div v-if="games.length">
      <div class="gameInfo" v-for="game in games">
        {{ game.id }} ddd
      </div>
    </div>
    <div v-else>
      <div>Brak aktualnie prowadzonych gier</div>
    </div>
  </div>
</template>

<script>
import {useWebsocketStore} from '@/stores/websocketStore'

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
      const url = this.websocketStore.websocketAddressAPI + "/game/create";
      fetch(url).then(res => res.json())
          .then(res => console.log(res));
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
