<template>
  <div class="goods">
    <div
      class="menu-wrapper"
      ref="menuWrapper"
    >
      <ul ref="menucontent">
        <!-- current -->
        <li
          class="menu-item"
          :class="{ current: index === currentIndex }"
          v-for="(good, index) in shopGoods"
          @click="clickMenuItem(index)"
          :key="index"
        >
          <span class="text bottom-border-1px">
            <img
              class="icon"
              :src="good.icon"
              v-if="good.icon"
            />
            {{ good.name }}
          </span>
        </li>
      </ul>
    </div>
    <div
      class="foods-wrapper"
      ref="foodsWrapper"
    >
      <ul>
        <li
          class="food-list-hook"
          v-for="(good, index) in shopGoods"
          :key="index"
        >
          <h1 class="title">{{ good.name }}</h1>
          <ul>
            <li
              class="food-item bottom-border-1px"
              v-for="(food, index) in good.foods"
              :key="index"
              @click="showFood(food)"
            >
              <div class="icon">
                <img
                  width="57"
                  height="57"
                  :src="food.icon"
                />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售 {{ food.sellCount }} 份</span>
                  <span>好评率 {{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span
                    class="old"
                    v-if="food.oldPrice"
                  >￥{{ food.oldPrice }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart />
    <Food
      :food="food"
      ref="food"
    />
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapActions, mapState } from 'vuex'
import CartControl from '../../../components/CartControl/CartControl.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'
import Food from '../../../components/Food/Food.vue'
export default {
  name: 'shopgoods',
  data () {
    return {
      tops: [], //  所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
      menus: [], //
      scrollY: 0, // 右侧滑动的Y轴坐标 (滑动过程时实时变化)
      isShowFood: false,  // 是否显示food弹出框
      food: {} // 点击时当前的食品
    }
  },
  computed: {
    ...mapState(['shopGoods']),
    currentIndex () {
      let { scrollY, tops } = this
      let index = tops.findIndex((top, index) => {
        return scrollY >= tops[index] && scrollY < tops[index + 1]
      })
      return index
    },
  },
  watch: {
    shopGoods (newValue) {
      this.$nextTick(() => {
        if (newValue.length) {
          this._initScroll()
          this._initTops()
          this._initMenus()
        }
      })
    },
  },
  methods: {
    ...mapActions(['recShopGoods']),
    showFood (food) {
      this.food = food
      console.log(this.food, 'showFood')
      this.$refs.food.toggleFood()
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true,
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3,
      })
      let wrapHeight = this.$refs.menuWrapper.clientHeight
      let contHeight = this.$refs.menucontent.clientHeight
      let diff = contHeight - wrapHeight
      this.foodsScroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y)
        let index = this.currentIndex
        if (this.menus[index] > diff) {
          this.menuScroll.scrollTo(0, -diff, 300)
        } else {
          this.menuScroll.scrollTo(0, -this.menus[index], 300)
        }
      })
    },
    clickMenuItem (index) {
      let scrollY = this.tops[index]
      this.scrollY = scrollY
      this.foodsScroll.scrollTo(0, -scrollY, 300)
    },
    _initTops () {
      // 收集每个li的Y坐标
      let tops = []
      let top = 0
      tops.push(top)
      let lis = [...this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')]
      lis.forEach((li) => {
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops
    },
    _initMenus () {
      // 收集每个li的Y坐标
      let tops = []
      let top = 0
      tops.push(top)
      let lis = [...this.$refs.menuWrapper.getElementsByClassName('menu-item')]
      lis.forEach((li) => {
        top += li.clientHeight
        tops.push(top)
      })
      this.menus = tops
    },
  },
  mounted () {
    this.recShopGoods()
  },
  components: {
    CartControl,
    ShopCart,
    Food
  },
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/css/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
