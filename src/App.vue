<template>
  <div id="app">
    <FooterGuide />
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  methods: {
    ...mapActions(['getAddress']),
  },
  mounted() {
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
  // background: #f5f5f5;
}
</style>
