<template>
  <footer class="footer_guide border-1px">
    <router-link to="/home" class="guide_item" :class="{ on: $route.path === '/home' }" replace>
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </router-link>

    <router-link to="/search" class="guide_item" :class="{ on: $route.path === '/search' }" replace>
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </router-link>

    <router-link to="/order" class="guide_item" :class="{ on: $route.path === '/order' }" replace>
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </router-link>

    <!-- <router-link :to="{ path: '/profile', query: { id: 1234345 } }" class="guide_item" :class="{ on: $route.path === '/profile' }" replace>
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </router-link> -->
    <router-link
      :to="{ name: 'Profile', params: { id: 1234345 } }"
      class="guide_item"
      :class="{ on: $route.path === '/profile' }"
      replace
    >
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </router-link>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/css/mixins.styl';

.footer_guide { // footer
  top-border-1px(#e4e4e4);
  position: fixed;
  z-index: 300;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;

  .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    color: #999999;

    &.on {
      color: #02a774;
    }

    span {
      font-size: 12px;
      margin-bottom: 2px;

      .iconfont {
        font-size: 22px;
      }
    }
  }
}
</style>
