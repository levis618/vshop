<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right" @click="go">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-person"></i>
        </span>
      </span>
    </HeaderTop>
    <div class="miste-content-wrapper">
      <div class="miste-content">
        <!--首页导航-->
        <MsiteNav />
        <!--首页附近商家-->
        <ShopList />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BScroll from 'better-scroll'

import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import MsiteNav from '../../components/MsiteNav/MsiteNav.vue'
import ShopList from '../../components/ShopList/ShopList.vue'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['address', 'shops', 'userInfo']),
  },
  methods: {
    ...mapActions(['getShops']),
    go() {
      const path = this.userInfo._id ? '/profile' : '/login'
      this.$router.push(path)
      // if (this.userInfo._id) {
      //   this.$router.push('/profile')
      // } else {
      //   this.$router.push('/login')
      // }
    },
  },
  watch: {
    shops(newValue) {
      this.$nextTick(() => {
        if (newValue.length) {
          this.bScroll = new BScroll('.miste-content-wrapper', {
            click: true,
          })
        }
      })
    },
  },
  mounted() {},
  components: {
    HeaderTop,
    MsiteNav,
    ShopList,
  },
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .miste-content-wrapper {
    position: fixed;
    top: 45px;
    bottom: 50px;
    width: 100%;
  }
}
</style>
