<template>
  <div class="monopoly-board-wrapper" :class="{ 'view-3d': is3D }">
    <div class="switch-3d" @click="is3D = !is3D">
      {{ is3D ? '2D' : '3D' }}
    </div>

    <div class="monopoly-board">
      <div class="row">
        <div class="corner">Bezpłatny parking?</div>
        <div class="elements last-in-row-no-shadow">
          <RowElement v-for="element in rowElementsTop" :element="element"></RowElement>
        </div>
        <div class="corner">Idziesz na odpoczynek</div>
      </div>

      <div class="row">
        <div class="elements column last-no-shadow">
          <RowElement v-for="element in rowElementsLeft" :element="element" :column="true"></RowElement>
        </div>
        <div class="center-board"></div>
        <div class="elements column">
          <RowElement v-for="element in rowElementsRight" :element="element" :column="true"></RowElement>
        </div>
      </div>

      <div class="row">
        <div class="corner shorter">Miejsce odpoczynku</div>
        <div class="elements">
          <RowElement v-for="element in rowElementsBottom" :element="element"></RowElement>
        </div>
        <div class="corner shorter" style="z-index: 2;"></div>
        <div class="corner" style="z-index: 2;">Start</div>
      </div>
      <div class="player-counter bottom" style="--position:5"></div>
      <div class="player-counter left" style="--position:12"></div>
      <div class="player-counter top" style="--position:20"></div>
    </div>
    <div class="players">
      <div class="player player-red">
        <div class="name">Lorem ipsum</div>
        <div class="money">100</div>
      </div>
      <div class="player player-green">
        <div class="name">Lorem ipsum</div>
        <div class="money">100</div>
      </div>
      <div class="player player-blue">
        <div class="name">Lorem ipsum</div>
        <div class="money">100</div>
      </div>
      <div class="player player-yellow">
        <div class="name">Lorem ipsum</div>
        <div class="money">100</div>
      </div>
    </div>
  </div>
</template>

<script>
import RowElement from './RowElement.vue';
import { BoardsFields } from "../data";

export default {
  data() {
    return {
      rowElements: 9,
      rowElementsTop: BoardsFields.slice(21, 30),
      rowElementsBottom: BoardsFields.slice(1, 10).reverse(),
      rowElementsLeft: BoardsFields.slice(11, 20).reverse(),
      rowElementsRight: BoardsFields.slice(31, 40),
      is3D: false,

    }
  },
  components: {
    RowElement
  },
  props: {
    column: {
      type: Boolean
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
  --paddings: 20px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    left: calc(100vw - 75px);
    top: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: blue;
    color: white;
  }

  &.view-3d {
    --mainSize: min(70vw - var(--paddingsX2), 100vh - var(--paddingsX2));
    --rotate: rotateX(-90deg);

    .monopoly-board {
      transform: rotateX(55deg) rotateZ(45deg);
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
      background: $cornerColor;
      border: 1px solid $shadowColor;
      box-shadow: 1px 1px 0px $shadowColor,
      2px 2px 0px $shadowColor,
      3px 3px 0px $shadowColor,
      4px 4px 0px $shadowColor,
      5px 5px 0px $shadowColor,
      6px 6px 0px $shadowColor,
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
    }

    .player-counter {
      width: 20px;
      height: 60px;
      background: red;
      position: absolute;

      &.bottom {
        bottom: 0;
        right: calc(var(--position) / 10 * var(--mainSize));
      }

      &.left {
        left: 0;
        bottom: calc((var(--position) - 10) / 10 * var(--mainSize));
      }

      &.top {
        top: 0;
        left: calc((var(--position) - 20) / 10 * var(--mainSize));
      }

      &.right {
        right: 0;
        top: calc((var(--position) - 30) / 10 * var(--mainSize));
      }
    }
  }

  .players {
    font-size: min(4vw, 4vh);
    .player-red {
      position: absolute;
      left: 0;
      top: 0;
      color:#ef0163;
    }

    .player-green {
      position: absolute;
      right: 0;
      top: 0;
      text-align: right;
      color: #24af04;
    }

    .player-blue {
      position: absolute;
      left: 0;
      bottom: 0;
      color: #01b7ef;
    }

    .player-yellow {
      position: absolute;
      right: 0;
      bottom: 0;
      text-align: right;
      color: #c97002;
    }
  }
}
</style>
