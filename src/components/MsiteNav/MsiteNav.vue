<template>
  <nav class="msite_nav">
    <div class="swiper-container" v-if="categorys.length">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(category, index) in categoryList" :key="index">
          <a href="javascript:" class="link_to_food" v-for="item in category" :key="item.id">
            <div class="food_container">
              <img :src="baseImagesURL + item.image_url" />
            </div>
            <span>{{ item.title }}</span>
          </a>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </nav>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import { chunk } from 'lodash-es'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      baseImagesURL: 'https://fuss10.elemecdn.com',
    }
  },
  computed: {
    ...mapState(['categorys']),
    categoryList() {
      return chunk(this.categorys, 8)
    },
  },
  methods: {
    ...mapActions(['getCategorys']),
  },
  watch: {
    categorys(value) {
      // 界面更新就立即创建Swiper对象
      this.$nextTick(() => {
        // 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
        // 创建一个Swiper实例对象, 来实现轮播
        new Swiper('.swiper-container', {
          loop: true, // 可以循环轮播
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
    },
  },
  mounted() {
    this.getCategorys()
  },
}
</script>

<style lang="stylus" scoped>
.msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 10px;
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
</style>
