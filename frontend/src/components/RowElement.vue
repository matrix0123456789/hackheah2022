<template>
  <div class="row-element" :class="{ column: column }">
    <div class="text">250</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
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
$rowElements: 7;
$maxWidth: calc((100vw / ($rowElements + 2)) - 20px);
$height: calc((100vh / ($rowElements + 2)) - 20px);
$width: $height;

.row-element {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: $width;
  height: $height;
  max-width: $maxWidth;
  border: 1px solid $shadowColor;
  background: $tileColor;
  box-shadow: 1px 1px 0px $shadowColor,
    2px 2px 0px $shadowColor,
    3px 3px 0px $shadowColor,
    4px 4px 0px $shadowColor,
    5px 5px 0px $shadowColor,
    6px 6px 0px $shadowColor;

  &.column {
    width: $height;
    height: $width;
    position: relative;

    .text {
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: rotate(-90deg) translateX(calc(-50% + 10px));
    }
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
}
</style>
