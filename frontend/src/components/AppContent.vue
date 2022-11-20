<template>
  <div class="app-content">
    <MonopolyBoard v-if="navigatorStore.currentPage == navigatorStore.pages.game"/>
    <GamesList v-else-if="navigatorStore.currentPage == navigatorStore.pages.gamesList"/>
  </div>
</template>

<script>
import { useNavigatorStore } from '@/stores/navigator'
import MonopolyBoard from '../components/MonopolyBoard.vue';
import GamesList from "@/components/GamesList.vue";

export default {
  name: "AppContent",
  components: {
    GamesList,
    MonopolyBoard,
  },
  data() {
    return {
      navigatorStore: useNavigatorStore(),
    }
  },
}
</script>

<style scoped>
.app-content{

}
</style>
