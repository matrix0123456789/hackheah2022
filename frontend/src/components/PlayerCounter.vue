<template>
  <div class="player-counter" :class="[className, 'counter-'+color]" :style="{'--position':position}"></div>
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
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
  transform: var(--rotate);
  transform-origin: bottom;
  filter: drop-shadow(0 0 5px black);

  &.bottom-right {
    bottom: calc(var(--fieldHeight) * 0.5);
    right: calc(var(--fieldHeight) * 0.5);
    transform: rotate(-45deg);
  }

  &.bottom {
    margin: 0 -10px;
    bottom: 0;
    right: calc((var(--position) - 0.5) * var(--fieldWidth) + var(--fieldHeight));
  }

  &.bottom-left {
    bottom: calc(var(--fieldHeight) * 0.5);
    left: calc(var(--fieldHeight) * 0.5);
    transform: rotate(-45deg);
  }

  &.left {
    left: var(--fieldHeight);
    transform: rotate(-90deg);
    transform-origin: 0 100%;
    margin: -10px 0;
    bottom: calc((var(--position) - 10.5) * var(--fieldWidth) + var(--fieldHeight));
  }

  &.top-left {
    top: calc(var(--fieldHeight) * 0.5);
    left: calc(var(--fieldHeight) * 0.5);
    transform: rotate(-45deg);
  }

  &.top {
    top: var(--fieldHeight);
    margin: -60px 0;
    left: calc((var(--position) - 20.5) * var(--fieldWidth) + var(--fieldHeight));
  }

  &.top-right {
    top: calc(var(--fieldHeight) * 0.5);
    right: calc(var(--fieldHeight) * 0.5);
    transform: rotate(-45deg);
  }

  &.right {
    right: 0;
    transform: rotate(-90deg);
    transform-origin: 0 100%;
    margin: 0 -10px;
    top: calc((var(--position) - 31) * var(--fieldWidth) + var(--fieldHeight));
  }

  &.counter-red {
    background: #ef0163;
  }

  &.counter-green {
    background: #24af04;
  }

  &.counter-blue {
    background: #01b7ef;
  }

  &.counter-yellow {
    background: #c97002;
  }
}
</style>