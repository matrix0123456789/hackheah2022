<template>
<div class="games-list-widget">
  <div v-if="websocketStore.games.length">
    <div class="gameInfo" v-for="game in websocketStore.games">
      {{game.name}}
    </div>
  </div>
  <div v-else>
    <div>Brak aktualnie prowadzonych gier</div>
    <button>
      Utwórz gre
    </button>
  </div>
</div>
</template>

<script>
import { useWebsocketStore } from '@/stores/websocketStore'

export default {
  name: "GamesList",
  data() {
    return {
      websocketStore: useWebsocketStore()
    }
  },
}
</script>

<style scoped>
.games-list-widget{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw ;
  font-size: 40px   ;
}
</style>
