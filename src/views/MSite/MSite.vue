<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span
        class="header_search"
        slot="left"
        @click="$router.push('/search')"
      >
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span
        class="header_login"
        slot="right"
        @click="go"
      >
        <span
          class="header_login_text"
          v-if="!userInfo._id"
        >登录|注册</span>
        <span
          class="header_login_text"
          v-else
        >
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
import { Indicator } from 'mint-ui'
import { mapActions, mapState } from 'vuex'
import BScroll from 'better-scroll'

import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import MsiteNav from '../../components/MsiteNav/MsiteNav.vue'
import ShopList from '../../components/ShopList/ShopList.vue'

export default {
  data () {
    return {
      isLoad: true,
    }
  },
  computed: {
    ...mapState(['address', 'shops', 'userInfo']),
  },
  methods: {
    ...mapActions(['getShops']),
    go () {
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
    shops (newValue) {
      this.$nextTick(() => {
        if (!this.bScroll) {
          this.bScroll = new BScroll('.miste-content-wrapper', {
            click: true,
            //上拉
            // pullUpLoad: true
            /*
            //下拉
             pullDownRefresh:{
                threshold:50,
                stop:20
            }
            */
            //  是否显示滚动条
            scrollbar: {
              fade: true,
            },
            // 上拉加载更多
            pullUpLoad: {
              threshold: -50, // 当上拉距离超过50px时触发 pullingUp 事件
            },
          })
        } else {
          this.bScroll.refresh()
        }
        this.bScroll.on('pullingUp', async (pos) => {
          console.log(pos, 'pos')
          if (this.isLoad) {
            this.isLoad = false
            Indicator.open('加载中...')
            await this.$store.dispatch('getShops').then(() => {
              this.isLoad = true
              Indicator.close()
            })
            this.bScroll.finishPullUp()
          }
        })
      })
    },
  },
  mounted () { },
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

  .miste-content-wrapper {
    position: fixed;
    top: 45px;
    bottom: 50px;
    width: 100%;
  }
}
</style>
