<template>
  <div id="app">
    <FooterGuide />
    <router-view />
  </div>
</template>

<script>
// import FooterGuid from '@/components/FooterGuid/FooterGuid.vue';
import FooterGuide from './components/FooterGuide/FooterGuide.vue';
export default {
  components: {
    FooterGuide,
  },
}
</script>

<style lang="stylus">
// #app
//   font-family Avenir, Helvetica, Arial, sans-serif
//   -webkit-font-smoothing antialiased
//   -moz-osx-font-smoothing grayscale
//   text-align center
//   color #2c3e50
//   margin-top 60px
</style>
