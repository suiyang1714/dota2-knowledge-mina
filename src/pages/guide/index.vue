<template lang="pug">
  .container(:style="{ backgroundImage: 'url( https://dota2qiniu.adityasui.com/dota_bg_'+ bgRandom +'.jpg)' }")
    .container__content(v-if="newUser")
      .user__getInfo
        button(open-type="getUserInfo", lang="zh_CN", @getuserinfo="onGotUserInfo") 开始
    .fixed--motto
      div 与其感慨路难行，不如马上出发
      div Better to run than curse the road.

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        code: null,
        newUser: false
      }
    },
    async onLoad () {
      this.$store.state.bgRandom = Math.ceil(Math.random() * 16)
      // const sleep = time => new Promise(resolve => setTimeout(resolve, time))

      wx.showLoading({
        title: '登录中'
      })

      // 获取 code
      await this.login()

      // 获取用户信息 -> 新用户 ?  将 openid 存入后台，返回sessionKey : 返回用户信息，sessionKey（用于获取openGid）
      let callback = await this.$store.dispatch('ValidateLogin', {code: this.code})

      if (callback.stored) {
        this.newUser = false

        // 对 shareTicket 是否携带进行处理
        this.checkShareTicket()
      } else {
        wx.hideLoading()
        this.newUser = true
      }
      // await sleep(1000)
    },
    methods: {
      login () {
        return new Promise(resolve => {
          wx.login({
            success: (res) => {
              this.code = res.code
              resolve()
            }
          })
        })
      },
      async onGotUserInfo (ev) {
        wx.showLoading({
          title: '登录中'
        })
        const { encryptedData, iv } = ev.mp.detail
        await this.$store.dispatch('ValidateUser', {
          encryptedData: encryptedData,
          iv: iv,
          sessionKey: this.$store.state.sessionKey
        })
        this.newUser = false

        // 对 shareTicket 是否携带进行处理
        this.checkShareTicket()
      },
      async getGroupRanked () {
        wx.getShareInfo({
          shareTicket: this.$root.$mp.appOptions.shareTicket,
          success: async (res) => {
            // 解密 openGid ，获取群成员列表
            await this.$store.dispatch('getGroupRanked', {
              encryptedData: res.encryptedData,
              iv: res.iv,
              sessionKey: this.$store.state.sessionKey
            })
          }
        })
      },
      async comparedOpenGID () {
        wx.getShareInfo({
          shareTicket: this.$root.$mp.appOptions.shareTicket,
          success: async (res) => {
            console.log(res)
            try {
              await this.$store.dispatch('comparedOpenGID', {
                encryptedData: res.encryptedData,
                iv: res.iv,
                sessionKey: this.$store.state.sessionKey,
                minauser_id: this.$store.state.userInfo._id
              })
            } catch (e) {
              console.log(e)
            }
          }
        })
      },
      async checkShareTicket () {
        if (this.$root.$mp.appOptions.scene === 1044 && this.$root.$mp.appOptions.query.groupRanked) {
          // 场景值 && 跳转到群排行榜的请求
          await this.getGroupRanked()

          wx.hideLoading()

          // 跳转到排行榜页面 -> 新用户也将直接跳转该页面，通过排行榜页面的返回首页来进行授权获取信息
          wx.redirectTo({
            url: '../rank/main'
          })
        } else if (this.$root.$mp.appOptions.scene === 1044) {
          // 将该用户添加到 openGid下
          await this.comparedOpenGID()

          wx.hideLoading()

          wx.redirectTo({
            url: '../index/main'
          })
        } else {
          wx.hideLoading()

          wx.redirectTo({
            url: '../index/main'
          })
        }
      }
    },
    computed: mapState([
      'bgRandom'
    ])
  }
</script>

<style scoped lang="scss">
.container {
  position: relative;
  justify-content: center;
  padding: 0;
  &__content {
    .user__getInfo {
      button {
        width: 240rpx;
        height: 80rpx;
        line-height: 80rpx;
        background-color: rgba(255,255,255, 0.5);
        &:after {
          border: none;
        }
      }
    }
  }
}
.fixed--motto {
  position: absolute;
  bottom: 20rpx;
  left: 0;
  width: 100%;
  color: #fff;
  font-size: 16px;
  line-height: 50rpx;
  text-align: center;
}
</style>
