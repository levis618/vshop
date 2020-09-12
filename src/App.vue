<template>
  <div id="app">
    <!-- <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition> -->
    <router-view />
    <FooterGuide v-show="$route.meta.hasFoot" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  methods: {
    ...mapActions(['autoLogin', 'getAddress']),
  },
  mounted () {
    this.autoLogin()
    this.getAddress()
  },
  components: {
    FooterGuide,
  },
}
</script>

<style lang="stylus">
#app {
  width: 100%;
  height: 100%;

  .fade-enter-active, .fade-leave-active {
    transition: transform 0.3s;
  }

  .fade-enter-to, .fade-leave {
    transform: translateX(0);
  }

  .fade-enter, fade-leave-to {
    transform: translateX(100%);
  }
}
</style>
