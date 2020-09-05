<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: isLoginType }"
            @click="toggleLoginType"
          >短信登录</a>
          <a
            href="javascript:;"
            :class="{ on: !isLoginType }"
            @click="toggleLoginType"
          >密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login_submit">
          <div :class="{ on: isLoginType }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{right_phone:rightPhone}"
                @click.prevent="getCode"
              >{{computeTime?`已发送(${computeTime}s)`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !isLoginType }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="text"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  v-if="showPwd"
                />
                <input
                  type="password"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  v-else
                />
                <div
                  class="switch_button"
                  :class="showPwd ? 'on' : 'off'"
                  @click="showPwd = !showPwd"
                >
                  <div
                    class="switch_circle"
                    :class="showPwd ? 'right' : ''"
                  ></div>
                  <span class="switch_text">{{ showPwd ? 'abc' : '...' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  alt="captcha"
                  ref="captcha"
                  @click="updateCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a
          href="javascript:;"
          class="about_us"
        >关于我们</a>
      </div>
      <a
        href="javascript:;"
        class="go_back"
        @click="$router.back()"
      >
        <i class="iconfont icon-jiantou2"></i>
      </a>
      <AlertTip
        :alertText="alertText"
        v-show="alertState"
        @closeTip="alertClose"
      />
    </div>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import { reqLoginPwd, reqSendCode, reqLoginSms } from '../../api'
import { mapActions } from 'vuex'

import { Toast, MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      name: '', // 用户名
      pwd: '', // 密码
      captcha: '', // 图形验证码
      phone: '',  // 手机号
      code: '',  // 短信验证码
      computeTime: 0,  //倒计时
      isLoginType: false, // 登录方式,true为短信登录,false为密码登录
      showPwd: false, // 显示/隐藏密码
      alertText: '', // 提示框文本
      alertState: false, // 提示框显示/隐藏
    }
  },
  computed: {
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    ...mapActions(['login']),
    // 切换登录方式
    toggleLoginType () {
      this.isLoginType = !this.isLoginType
    },
    // 提交登录
    async login_submit () {
      const { name, pwd, captcha, isLoginType, phone, code } = this
      let result
      if (!isLoginType) {
        // 密码登录
        if (!name) {
          // this.alertShow('用户名不能为空')
          Toast('用户名不能为空')
          return
        } else if (!pwd) {
          Toast('密码不能为空')
          // this.alertShow('密码不能为空')
          retrun
        } else if (!captcha) {
          Toast('验证码不能为空')
          // this.alertShow('验证码不能为空')
          return
        }
        result = await reqLoginPwd(name, pwd, captcha)
      } else {
        if (!phone) return Toast('手机号不能为空')
        if (!code) return Toast('短信验证码不能为空')
        result = await reqLoginSms(phone, code)
        console.log('reqLoginSms', result)
      }

      if (this.computeTime) {
        this.computeTime = 0
        clearInterval(this.intervalId)
        this.intervalId = undefined
      }

      // 根据结果处理数据
      if (!result.code) {
        this.login(result.data)
        this.$router.back()
      } else {
        this.updateCaptcha()
        Toast(result.msg)
      }
    },
    alertShow (text) {
      this.alertText = text
      this.alertState = true
    },
    alertClose () {
      this.alertText = ''
      this.alertState = false
    },
    // 获取短信验证码
    async getCode () {
      if (!this.computeTime) {
        this.computeTime = 30
        this.intervalId = setInterval(() => {
          this.computeTime--
          if (!this.computeTime) {
            clearInterval(this.intervalId)
          }
          console.log(this.computeTime)
        }, 1000);
        const { code, msg } = await reqSendCode(this.phone)
        if (code) {
          Toast(msg)
          if (this.computeTime) {
            this.computeTime = 0
            clearInterval(this.intervalId)
            this.intervalId = undefined
          }
        }
      }
    },

    // 获取一个新的图片验证码
    updateCaptcha () {
      // 每次指定的src要不一样
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    },
  },
  components: {
    AlertTip,
  },
  mounted () {
    this.updateCaptcha()
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // const { _id } = vm.$store.state.useInfo
      // const isLogin = vm.$store.state.userInfo._id
      // console.log(isLogin, 'login')
      // console.log(vm.$store.state.userInfo, '-----------login router')
      if (vm.$store.state.userInfo._id) {
        next('/profile')
      }
      next()
    })
  },
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone {
                color: #000;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
