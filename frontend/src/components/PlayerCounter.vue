<template>
  <div class="player-counter" :class="[className, 'counter-'+color]" :style="{'--position':position}">
    <img :src="'/src/assets/pionki/' + color + '.png'">
  </div>
</template>
<script>
export default {
  props: {
    position: {},
    color: {}
  },
  computed: {
    className() {
      if (this.position == 0) {
        return 'bottom-right';
      } else if (this.position < 10) {
        return 'bottom';
      } else if (this.position == 10) {
        return 'bottom-left';
      } else if (this.position < 20) {
        return 'left';
      } else if (this.position == 20) {
        return 'top-left';
      } else if (this.position < 30) {
        return 'top';
      } else if (this.position == 30) {
        return 'top-right';
      } else {
        return 'right';
      }
    }
  }
}
</script>
<style scoped lang="scss">
.player-counter {
  width: 20px;
  height: 60px;
  position: absolute;
  //border-top-left-radius: 100%;
  //border-top-right-radius: 100%;
  transform: var(--rotate);
  transform-origin: bottom;
  filter: drop-shadow(0 0 5px black);
  transition: all ease 1s;

  &.bottom-right {
    top: calc(var(--mainSize) - var(--fieldHeight) * 0.5  + var(--fieldColorMargin));
    left: calc(var(--mainSize) - var(--fieldHeight) * 0.5  + var(--fieldColorMargin));
    transform: rotate(0deg);
    margin: -50px 0;
  }

  &.bottom {
    margin: -80px -10px;
    top: var(--mainSize);
    left: calc( (9.5 - var(--position) ) * var(--fieldWidth) + var(--fieldHeight) + var(--fieldColorMargin));
  }

  &.bottom-left {
    top: calc(var(--mainSize) - var(--fieldHeight) * 0.5  + var(--fieldColorMargin));
    left: calc(var(--fieldHeight) * 0.5 + var(--fieldColorMargin));
    transform: rotate(-45deg);
  }

  &.left {
    left: var(--fieldHeight);
    transform: rotate(0deg);
    transform-origin: 0 100%;
    margin: 0 -30px;
  top: calc((19 - var(--position) ) * var(--fieldWidth) + var(--fieldHeight) + var(--fieldColorMargin));
  }

  &.top-left {
    top: calc(var(--fieldHeight) * 0.5  + var(--fieldColorMargin));
    left: calc(var(--fieldHeight) * 0.5  + var(--fieldColorMargin));
    transform: rotate(-45deg);
  }

  &.top {
    top: var(--fieldHeight);
    margin: -60px 0;
    left: calc((var(--position) - 20.5) * var(--fieldWidth) + var(--fieldHeight) + var(--fieldColorMargin));
  }

  &.top-right {
    top: calc(var(--fieldHeight) * 0.5  + var(--fieldColorMargin));
    left: calc(var(--mainSize) - var(--fieldHeight) * 0.5  + var(--fieldColorMargin));
    transform: rotate(0deg);
  }

  &.right {
    left: var(--mainSize);
    transform: rotate(-90deg);
    transform-origin: 0 100%;
    margin: 0 -10px;
    top: calc((var(--position) - 31) * var(--fieldWidth) + var(--fieldHeight) + var(--fieldColorMargin));
  }

  &.counter-red {
    background: 50% 50% no-repeat;
    --fieldColorMargin:calc(var(--fieldWidth) * -0.3);
    background-image: url(../assets/red.png);
    background-size: contain;
  }

  &.counter-green {
    background: 50% 50% no-repeat;
    --fieldColorMargin:calc(var(--fieldWidth) * -0.1);
    background-image: url(../assets/green.png);
    background-size: contain;
  }

  &.counter-blue {
    background: 50% 50% no-repeat;
    --fieldColorMargin:calc(var(--fieldWidth) * 0.1);
    background-image: url(../assets/blue.png);
    background-size: contain;
  }

  &.counter-yellow {
    background: 50% 50% no-repeat;
    --fieldColorMargin:calc(var(--fieldWidth) * 0.3);
    background-image: url(../assets/yellow.png);
    background-size: contain;
  }

  img{
    width: 100%;
    height: 100%;
  }
}
</style>
