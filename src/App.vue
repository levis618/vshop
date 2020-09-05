<template>
  <div id="app">
    <router-view />
    <FooterGuide v-show="$route.meta.hasFoot" />
    <!-- <FooterGuide v-show="$route.meta.showFooter" /> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  methods: {
    ...mapActions(['autoLogin']),
  },
  mounted() {
    this.autoLogin()
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
  // background: #f5f5f5;
}

* {
  touch-action: pan-y;
}
</style>
