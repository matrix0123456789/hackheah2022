<template>
  <div class="monopoly-board-wrapper" :class="{ 'view-3d': is3D }" @click="selectedField=null">
    <button class="switch-3d" @click="is3D = !is3D">
      {{ is3D ? '2D' : '3D' }}
    </button>
    <field-tooltip v-if="selectedField" :field="selectedField.field" :x="selectedField.x" :y="selectedField.y" @click.stop/>
    <!-- <button class='roll-button' @click="rollDice">Roll</button> -->

    <div class="monopoly-board">
      <div class="row">
        <div class="corner parking">Studnia</div>
        <div class="elements last-in-row-no-shadow">
          <RowElement v-for="element in rowElementsTop" :element="element" @click.stop="select($event, element)"></RowElement>
        </div>
        <div class="corner rest">Idziesz na odpoczynek</div>
      </div>

      <div class="row">
        <div class="elements column last-no-shadow">
          <RowElement v-for="element in rowElementsLeft" :element="element" :column="true"
                      @click.stop="select($event, element)"></RowElement>
        </div>
        <div class="center-board">
          <RollDice ref="rollDiceRef"></RollDice>
        </div>

        <div class="elements column">
          <RowElement v-for="element in rowElementsRight" :element="element" :column="true"
                      @click.stop="select($event, element)"></RowElement>
        </div>
      </div>

      <div class="row">
        <div class="corner rest-place">Miejsce odpoczynku</div>
        <div class="elements">
          <RowElement v-for="element in rowElementsBottom" :element="element"
                      @click.stop="select($event, element)"></RowElement>
        </div>
        <div class="corner start" style="z-index: 2;">Start</div>
      </div>
      <template v-if="websocketStore.allData && websocketStore.allData.game">
        <player-counter v-for="player in websocketStore.allData.game.players" :position="player.position"
                        :color="player.color"/>
      </template>
    </div>
    <div class="players" v-if="websocketStore.allData && websocketStore.allData.game">

      <div :class="['player', 'player-' + player.color]" v-for="player in websocketStore.allData.game.players">
        <span>{{ player.name }}</span>, {{ player.money }}<img src="../assets/monety.png"/>
      </div>
    </div>
  </div>
</template>

<script>
import RowElement from './RowElement.vue';
import {BoardsFields} from "../data";
import {useWebsocketStore} from '@/stores/websocketStore'
import PlayerCounter from "./PlayerCounter.vue";
import FieldTooltip from "./FieldTooltip.vue";
import RollDice from "./RollDice.vue";

export default {
  components: {
    FieldTooltip,
    RowElement, PlayerCounter, RollDice
  },
  props: {
    column: {
      type: Boolean
    }
  },
  data() {
    return {
      is3D: false,
      websocketStore: useWebsocketStore(),
      selectedField: null
    }
  },
  methods: {
    select(e, field) {
      this.selectedField = {field, x: e.pageX, y: e.pageY}
    }
  },
  computed: {
    rowElementsTop() {
      return (this.websocketStore?.allData?.game?.board || BoardsFields).slice(21, 30);
    },
    rowElementsBottom() {
      return (this.websocketStore?.allData?.game?.board || BoardsFields).slice(1, 10).reverse();
    },
    rowElementsLeft() {
      return (this.websocketStore?.allData?.game?.board || BoardsFields).slice(11, 20).reverse();
    },
    rowElementsRight() {
      return (this.websocketStore?.allData?.game?.board || BoardsFields).slice(31, 40);
    }
  },
  methods: {
    rollDice() {
      this.$refs.rollDiceRef.rollDice();
    }
  }
}
</script>

<style scoped lang="scss">
.monopoly-board-wrapper {
  $tileColor: #ece4e7;
  $shadowColor: #d9c7ce;
  $cornerColor: #abcacd;
  $rowElements: 9;
  --paddings: 32px;
  --mainSize: min(100vw - var(--paddingsX2), 100vh - var(--paddingsX2));
  transition: 1s ease all;
  --fieldHeight: calc(var(--mainSize) / (#{$rowElements} + 2) * 1.5);
  --fieldWidth: calc((var(--mainSize) - var(--fieldHeight) * 2) / (#{$rowElements}));

  @media (max-width: 600px) {
    --paddings: 10px;
  }

  --paddingsX2: calc(var(--paddings) * 2);


  $maxWidth: calc((100vw / ($rowElements + 2)) - var(--paddings));
  $height: calc((100vh / ($rowElements + 2)) - var(--paddings));
  $width: calc((100vw / ($rowElements + 2)) - var(--paddings));


  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 300vh;
  perspective-origin: 50% 50%;
  --rotate: rotateX(0);

  .switch-3d {
    cursor: pointer;
    position: absolute;
    left: calc(100vw - 75px);
    top: 70px;
    border-radius: 50%;
    border: 4px solid rgba(106, 59, 8, 1);
    width: 55px;
    height: 55px;
  }

  .roll-button {
    cursor: pointer;
    position: absolute;
    left: 15px;
    top: 70px;
  }


  &.view-3d {
    --mainSize: min(70vw - var(--paddingsX2), 100vh - var(--paddingsX2));
    --rotate: rotateX(-90deg);

    .monopoly-board {
      transform: rotateX(55deg) rotateZ(45deg);
    }

    .column {
      --rotate: rotateX(-90deg);
    }

    .player-counter {
      transform: rotateX(-90deg);

      &.right, &.left {
        transform: rotateZ(-90deg) rotateX(-90deg);

      }
    }
  }

  .monopoly-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    transition: all 0.3s;
    max-height: calc(var(--mainSize));
    max-width: calc(var(--mainSize));
    aspect-ratio: 1/1;
    transform-style: preserve-3d;

    .row {
      display: flex;
      width: 100%;
      transform-style: preserve-3d;
    }

    .corner {
      &.shorter {
        box-shadow: 1px 1px 0px $shadowColor,
        2px 2px 0px $shadowColor,
        3px 3px 0px $shadowColor,
        6px 4.5px 0 $shadowColor,
      }

      width: var(--fieldHeight);
      height: var(--fieldHeight);
      box-sizing: border-box;
      background: $cornerColor 50% 50% no-repeat;
      background-size: contain;
      border: 1px solid $shadowColor;
      padding: 6px;
      text-align: center;
      box-shadow: 1px 1px 0px $shadowColor,
      2px 2px 0px $shadowColor,
      3px 3px 0px $shadowColor,
      4px 4px 0px $shadowColor,
      5px 5px 0px $shadowColor,
      6px 6px 0px $shadowColor;
      &.parking{
        background-image: url(../assets/parking.png);
      }
      &.rest-place{
        background-image: url(../assets/odpoczynek.png);
      }
      &.rest{
        font-size: 1.5em;
        display: grid;
        justify-content: center;
        align-content: center;
      }
      &.start{
        font-size: 2em;
        display: grid;
        justify-content: center;
        align-content: center;
      }
    }

    .elements {
      display: flex;

      transform-style: preserve-3d;

      &.column {
        flex-direction: column;

        &.last-no-shadow {
          .row-element:last-child {
            box-shadow: 1px 0px 0px $shadowColor,
            2px 0px 0px $shadowColor,
            3px 0px 0px $shadowColor,
            4px 0px 0px $shadowColor,
            5px 0px 0px $shadowColor,
            6px 0px 0px $shadowColor,
          }
        }
      }
    }

    .center-board {
      flex-grow: 1;
      background: url(../assets/map.svg) 50% 50% no-repeat;
      background-size: cover;
      position: relative;
    }
  }

  .players {
    .player {
      border-radius: 7px;
      font-size: 17px;
      font-weight: 700;
      color: white;
      display: flex;
      align-items: center;
      position: absolute;
      padding: 5px 10px;
      text-shadow: 0 0 5px black;
      box-shadow: 0 0 8px black;
      margin: 10px;

      img {
        width: 20px;
        margin: 0 10px
      }
    }

    .player-red {
      position: absolute;
      left: 10px;
      top: 10px;
      background-color: lightcoral;
    }

    .player-green {
      position: absolute;
      right: 10px;
      top: 10px;
      text-align: right;
      background-color: lightgreen;

    }

    .player-blue {
      position: absolute;
      left: 10px;
      bottom: 10px;
      background-color: lightblue;
    }

    .player-yellow {
      position: absolute;
      right: 0;
      bottom: 0;
      text-align: right;
      background-color: lightslategray;
    }
  }
}
</style>
