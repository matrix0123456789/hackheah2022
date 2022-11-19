<template>
  <div class="monopoly-board-wrapper" :class="{ 'view-3d': is3D }">
    <div class="switch-3d" @click="is3D = !is3D">
      {{ is3D ? '2D' : '3D' }}
    </div>

    <div class="monopoly-board">
      <div class="row">
        <div class="corner"></div>
        <div class="elements row">
          <RowElement v-for="element in rowElements"></RowElement>
        </div>
        <div class="corner"></div>
      </div>

      <div class="row">
        <div class="elements column last-no-shadow">
          <RowElement v-for="element in rowElements" :column="true"></RowElement>
        </div>
        <div class="center-board"></div>
        <div class="elements column">
          <RowElement v-for="element in rowElements" :column="true"></RowElement>
        </div>
      </div>

      <div class="row">
        <div class="corner"></div>
        <div class="elements row">
          <RowElement v-for="element in rowElements"></RowElement>
        </div>
        <div class="corner" style="z-index: 2;"></div>
      </div>

    </div>
  </div>
</template>

<script>
import RowElement from './RowElement.vue';

export default {
  data() {
    return {
      rowElements: 7,
      is3D: false
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

<style lang="scss">
$tileColor: #ece4e7;
$shadowColor: #d9c7ce;
$cornerColor: #abcacd;
$rowElements: 7;

$maxWidth: calc((100vw / ($rowElements + 2)) - 20px);
$height: calc((100vh / ($rowElements + 2)) - 20px);
$width: $height;
// $height: width;

.monopoly-board-wrapper {
  position: relative;
  width: fit-content;

  .switch-3d {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    left: calc(100% + 30px);
    top: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: blue;
    color: white;
  }

  &.view-3d {
    perspective: 300vh;
    perspective-origin: 50% 50%;

    .monopoly-board {
      transform: rotateX(55deg) rotateZ(45deg);
      transform-style: preserve-3d;
    }
  }

  .monopoly-board {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin-left: 100px;
    margin-top: 50px;
    transition: all 0.3s;
    // max-width: 100vw;
    // max-height: 100vh;
    // width: 100%;
    // height: 100%;

    .row {
      display: flex;
    }

    .corner {
      width: $width;
      height: $width;
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
      width: calc($height * $rowElements + calc($rowElements * 2px));
    }
  }
}
</style>
