<template>
  <div class="wrap">
    <div class="content">
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <div class="place">
        <label>
          <input
            type="checkbox"
            v-model="allChecked"
          />全选/全不选
        </label>
      </div>
      <div
        class="place"
        @click="checkOther"
      >反选</div>
      <ul class="place">
        <li
          v-for="item in list"
          :key="item.id"
        >
          <input
            type="checkbox"
            v-model="item.checked"
          >
          <span>{{item.name}}</span>
        </li>
      </ul>
      数量{{checkCount}}
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      list: [
        {
          name: '小明',
          age: 23,
          checked: false
        },
        {
          name: '小红',
          age: 2,
          checked: true
        },
        {
          name: '小蓝',
          age: 23,
          checked: true
        },
        {
          name: '小bai',
          age: 40,
          checked: true
        },
        {
          name: '王小二',
          age: 18,
          checked: false
        }
      ],
    }
  },
  computed: {
    // 选中的数量
    checkCount () {
      return this.list.reduce((prevalue, item) => prevalue += item.checked ? 1 : 0, 0)
    },
    // 全选/全不选
    allChecked: {
      get () {
        return this.list.length === this.checkCount
      },
      set (val) {
        this.list.forEach((item) => {
          item.checked = val
        })
      }
    }
  },
  methods: {
    // 反选
    checkOther () {
      this.list.forEach((item) => {
        item.checked = !item.checked
      })
    }
  },
  mounted () {
    new BScroll('.wrap', { click: true })
  }
}
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.place {
  margin-top: 20px;
}
</style>