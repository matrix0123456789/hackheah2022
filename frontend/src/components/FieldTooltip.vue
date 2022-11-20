<template>
  <div class="field-tooltip" :style="{left:x+'px', top:y+'px'}">
    <template v-if="field.type=='village'">
      <div class="name">{{ field.name }}</div>
      <div class="keyValue">
        <div>Właściciel</div>
        <div>{{ owner?.name ?? 'brak' }} <span v-if="amIOwner">(Ty)</span></div>
      </div>
      <button @click="build" v-if="amIOwner">Buduj chatę</button>
    </template>
    <template v-else-if="field.type=='windmill'">
      <div class="name">Młyn</div>
      <div class="keyValue">
        <div>Właściciel</div>
        <div>{{ owner?.name ?? 'brak' }} <span v-if="amIOwner">(Ty)</span></div>
      </div>
    </template>

    <template v-else-if="field.type=='chance'">
      <div class="name">Szansa</div>
    </template>

    <template v-else-if="field.type=='tax'">
      <div class="name">Zbierasz daninę</div>
    </template>
    <template v-else-if="field.type=='tavern'">
      <div class="name">Karczma</div>
    </template>
    <template v-else-if="field.type=='church'">
      <div class="name">Kościół</div>
    </template>
    <template v-else>{{ field.type }}</template>
  </div>
</template>

<script>
import {useWebsocketStore} from "../stores/websocketStore";

export default {
  name: "FieldTooltip",
  props: {
    field: {},
    x: {},
    y: {}
  }, data() {
    return {
      websocketStore: useWebsocketStore()
    }
  },
  methods: {
    build() {
      this.websocketStore.buildHouse(this.field.id);
    }
  },
  computed: {
    amIOwner() {
      return this.websocketStore.allData.currentPlayer.id == this.field.owner
    },
    owner() {
      return this.websocketStore.allData?.game?.players?.find(p => p.id == this.field.owner)
    }
  }
}
</script>

<style lang="scss" scoped>
.field-tooltip {
  background: #fff;
  box-shadow: 0 0 5px -2px black;
  position: absolute;
  z-index: 10;
  padding: 8px;
  min-width: 160px;
  min-height: 300px;

  .keyValue {
    display: grid;
    grid-template-columns: 80px 80px;

    :first-child {

    }

    :last-child {
      font-weight: 700;
    }

  }
}
</style>