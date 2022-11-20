<template>
  <div class="chance-widget" :class="{ show: show }">
    <div class="wrapper">

      <div class="buy-info-container">
        <p>Szansa ?</p>

        <div v-if="chanceInfo" class="price">
          Cena: {{ chanceInfo }}zł
        </div>

        <div class="buttons-container" @click="buy" v-if="isOwner"
        >
          <button>
            Kup
          </button>
          <button @click="leave">
            Rezygnuj
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useWebsocketStore } from "@/stores/websocketStore";

export default {
  name: "Chance",
  data() {
    return {
      websocketStore: useWebsocketStore(),
      show: false
    }
  },
  computed: {
    chanceInfo() {
      return this.websocketStore.chanceDecisionPending;
    },
    isOwner(){
      return this.websocketStore.chanceDecisionPending && this.websocketStore.chanceDecisionPending.playerId == this.websocketStore.allData.currentPlayer.id;
    }
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    buy() {
      this.websocketStore.buy();
      this.close();
    },
    leave() {
      this.close();
    }
  },
  watch: {
    chanceInfo(newVal) {
      if (this.chanceInfo) {
        setTimeout(() => {
          this.open();
        }, 1500)
      }

      console.log('buyInfo', this.chanceInfo)
    }
  },
  mounted() {
    console.log('buyInfo', this.chanceInfo)
  }
}
</script>

<style scoped lang="scss">
.chance-widget {
  display: none;
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
  background: transparent;

  &.show {
    display: flex;
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

    .buy-info-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      .price {
        font-size: 20px;
        margin-bottom: 30px;
      }

      .buttons-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
    }
  }
}
</style>
