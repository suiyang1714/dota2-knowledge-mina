<template lang="pug">
  .container(:style="{ backgroundImage: 'url( https://dota2qiniu.adityasui.com/dota_bg_'+ bgRandom +'.jpg)' }")
    .fixed--motto
      div 与其感慨路难行，不如马上出发
      div Better to run than curse the road.

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        code: null
      }
    },
    async onLoad () {
      this.$store.state.bgRandom = Math.ceil(Math.random() * 16)
      const sleep = time => new Promise(resolve => setTimeout(resolve, time))
      wx.showLoading({
        title: '登录中'
      })
      await this.login()

      await this.$store.dispatch('ValidateLogin', {code: this.code})
      // await this.getUserInfoFn()
      await sleep(2000)
      wx.hideLoading()
      wx.redirectTo({
        url: '../index/main'
      })
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
      getUserInfoFn () {
        return new Promise((resolve, reject) => {
          wx.getSetting({
            success: (res) => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: (res) => {
                    console.log(res)
                    this.$store.state.userInfo = res.userInfo
                    resolve()
                  }
                })
              } else {
                console.log(res)
                resolve(res)
              }
            }
          })
        })
      }
    },
    async beforeMount () {

    },
    computed: mapState([
      'bgRandom'
    ])
  }
</script>

<style scoped lang="scss">
.container {
  position: relative;
}
.fixed--motto {
  position: fixed;
  bottom: 20rpx;
  left: 0;
  width: 100%;
  color: #fff;
  font-size: 16px;
  line-height: 50rpx;
  text-align: center;
}
</style>
