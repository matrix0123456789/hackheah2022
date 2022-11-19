<template>
  <div class="row-element" :class="{ column: column }">
    <div class="row-element-content" :class="element?.type">
      <template v-if="element==null"></template>
      <template v-else-if="element.type=='village'">
        <div class="colorBlock"></div>
        <div class="name">{{ element.name }}</div>
        <div class="price">{{ element.price }}</div>
      </template>
      <template v-else>{{ element.type }}</template>

    </div>
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
    },
    element: {}
  }
}
</script>

<style scoped lang="scss">
$tileColor: #ece4e7;
$shadowColor: #d9c7ce;
$rowElements: 7;


// $maxWidth: calc((100vw / ($rowElements + 2)) - 20px);


.row-element {
  --paddings: 20px;


  @media (max-width: 600px) {
    --paddings: 10px;
  }

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: var(--fieldWidth);
  height: var(--fieldHeight);
  box-sizing: border-box;

  border: 1px solid $shadowColor;
  background: $tileColor;
  box-shadow: 1px 1px 0px $shadowColor,
  2px 2px 0px $shadowColor,
  3px 3px 0px $shadowColor,
  4px 4px 0px $shadowColor,
  5px 5px 0px $shadowColor,
  6px 6px 0px $shadowColor;
  position: relative;

  &.column {
    width: var(--fieldHeight);
    height: var(--fieldWidth);
    position: relative;

    .text {
      position: absolute;
      font-size: 10px;
      bottom: 5px;
      left: 50%;
      transform: rotate(-90deg) translateX(calc(-50% + 10px));
    }

    .row-element-content {
      transform: rotate(-90deg) translateX(-100%);
      transform-origin: 00% 00%;
    }
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }

  .row-element-content {

    width: var(--fieldWidth);
    height: var(--fieldHeight);
    position: absolute;
    left: 0;
    top: 0;
    font-size: calc(var(--fieldWidth) * 0.2);
    text-align: center;

    &.village {
      display: grid;
      grid-template-rows: 20% 1fr max-content;

      .colorBlock {
        background: red;
        box-shadow: 0 0 0 calc(var(--fieldHeight) * 0.04) black inset;
      }
    }
  }
}
</style>
