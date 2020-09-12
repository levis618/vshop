<template>
  <div ref="wrapper">
    <slot></slot>
    <!--分发内容-->
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    data: {
      default: null
    }
  },
  methods: {
    iniScoll () {
      // this.scroll = new BScroll(this.$refs.wrapper, { click: true })
      // console.log(this.scroll)
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, { click: true })
      } else {
        this.scroll.refresh()
      }
      console.log(this.scroll)
    }
  },
  mounted () {
    this.iniScoll()
  },
  watch: {
    data (value) {
      this.$nextTick(() => {
        // console.log('object')
        // if (!value.length) {
        //   this.iniScoll()
        // }
      })
    }
  },
};
</script>

<style lang="stylus" scoped></style>
