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

<style scoped lang="scss">
.monopoly-board-wrapper {
  $tileColor: #ece4e7;
  $shadowColor: #d9c7ce;
  $cornerColor: #abcacd;
  $rowElements: 7;
  --paddings: 20px;

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
    align-items: center;
    width: fit-content;
    transition: all 0.3s;
    max-height: min(calc(100vw - var(--paddingsX2)), calc(100vh - var(--paddingsX2)));
    max-width: min(calc(100vw - var(--paddingsX2)), calc(100vh - var(--paddingsX2)));
    aspect-ratio: 1/1;

    .row {
      display: flex;
      max-width: 100%;
    }

    .corner {
      width: min(calc(100vh / ($rowElements + 2)) - var(--paddings), calc(100vw / ($rowElements + 2)) - var(--paddings));
      max-width: min(calc(100vw / $rowElements), calc(100vh / $rowElements));
      height: min(calc(100vh / ($rowElements + 2)) - var(--paddings), calc(100vw / ($rowElements + 2)) - var(--paddings));
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
      width: min(calc($width * $rowElements + calc($rowElements * 2px)), calc($height * $rowElements + calc($rowElements * 2px)));
    }
  }
}
</style>
