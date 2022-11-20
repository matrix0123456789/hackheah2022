<template>
  <div class="row-element" :class="[{ column: column }, { down: down }]">
    <div class="row-element-content" :class="element?.type">
      <template v-if="element==null"></template>
      <template v-else-if="element.type=='village'">
        <div class="colorBlock" :class="element.country">
          <div class="house" v-for="i in element.houseCount"></div>
        </div>
        <div class="name">{{ element.name }}</div>
        <div class="price">{{ element.price }}</div>
      </template>
      <template v-else-if="element.type=='windmill'">
        <div class="name">Młyn</div>
        <div class="price">{{ element.price }}</div>
      </template>

      <template v-else-if="element.type=='chance'">
        <div class="name">Szansa</div>
      </template>

      <template v-else-if="element.type=='tax'">
        <div class="name">Zbierasz daninę</div>
      </template>
      <template v-else-if="element.type=='tavern'">
        <div class="name">Karczma</div>
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
    down: {
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
  transform-style: preserve-3d;


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
  transition: 0.1s;

  &.down {
    transform: translate(7px, 7px);
  }

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
    font-size: calc(var(--fieldWidth) * 0.18);
    text-align: center;
    transform-style: preserve-3d;

    &.village {
      display: grid;
      grid-template-rows: 1fr max-content max-content;

      .colorBlock {
        background: red;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5) inset, 0 0 10px rgba(255, 255, 255, 0.5) inset;
        display: grid;
        align-items: center;
        justify-items: center;
        transform-style: preserve-3d;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;

        &.poland {
          background: #9b8695;
        }

        &.ukraine {
          background: #bec196;
        }

        &.czekia {
          background: #bcb2c1;
        }

        &.austria {
          background: #b4ce63;
        }

        &.hungary {
          background: #d2cdb9;
        }

        &.serbia {
          background: #b2c0c1;
        }

        &.romania {
          background: #bcc1b2;
        }

        &.slovakia {
          background: #9593a8;
        }

        .house {
          width: calc(var(--fieldHeight) * 0.2);
          height: calc(var(--fieldHeight) * 0.2);
          background: url(../assets/dom.png) 50% 50% no-repeat;
          background-size: 150%;
          transform: var(--rotate);
          transform-origin: bottom;
        }
      }
    }

    &.windmill {
      display: grid;
      grid-template-rows: 1fr max-content;

      &::before {
        transform: var(--rotate);
        transform-origin: bottom;
        background: url(../assets/mlyn.png) 50% 50% no-repeat;
        background-size: 100%;
        content: '';
        display: block;
        height: calc(var(--fieldHeight) * 0.8);
        width: calc(var(--fieldWidth));
        filter: drop-shadow(0 0 5px black);
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    &.chance, &.church, &.tax, &.tavern {
      display: grid;
      grid-template-rows: 1fr max-content;

      &::before {
        transform: var(--rotate);
        transform-origin: bottom;
        background: 50% 50% no-repeat;
        background-size: contain;
        content: '';
        display: block;
        height: calc(var(--fieldHeight) * 0.8);
        width: calc(var(--fieldWidth));
        filter: drop-shadow(0 0 5px black);
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    &.chance {
      &::before {
        background-image: url(../assets/szansa.png);
      }
    }

    &.church {
      &::before {
        background-image: url(../assets/kosciol.png);
      }
    }

    &.tax {
      &::before {
        background-image: url(../assets/danina.png);
      }
    }

    &.tavern {
      &::before {
        background-image: url(../assets/karczma.png);
      }
    }

    .price {
      font-size: 2em;
    }
  }
}
</style>
