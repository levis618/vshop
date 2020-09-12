<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="iconfont icon-remove_circle_outline"
        v-show="food.count"
        @click.stop="changeFoodCount(false)"
      ></div>
    </transition>
    <div
      class="cart-count"
      v-if="food.count"
    >{{food.count}}</div>
    <div
      class="iconfont icon-add_circle"
      @click.stop="changeFoodCount(true)"
    ></div>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    food: {
      type: Object,
      default: {}
    },
  },
  methods: {
    ...mapActions(['updateFoodCount']),
    changeFoodCount (isAdd) {
      // console.log(this.methods)
      // this.$store.dispatch('updateFoodCount', { isAdd, food: this.food })
      this.updateFoodCount({ isAdd, food: this.food })
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/mixins.styl';

.cartcontrol {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .icon-remove_circle_outline {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: $green;

    &.move-enter-active, &.move-leave-active {
      transition: all 0.3s;
    }

    &.move-enter, &.move-leave-to {
      opacity: 0;
      transform: translateX(15px) rotate(180deg);
    }
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .icon-add_circle {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: $green;
  }
}</style>