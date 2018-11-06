<template lang="pug">
  .container(:style="{ backgroundImage: 'url( https://dota2qiniu.adityasui.com/dota_bg_'+ bgRandom +'.jpg)' }")
    .container__header
      .user__info
        .user__info--avatar
          img(:src="userInfo.avatarUrl")
        .user__info--nickname {{ userInfo.nickname }}
        .user__info--record
          text 答对 {{ userInfo.record.victory }}
          text 答错 {{ userInfo.record.failure }}
          text 连胜 {{ userInfo.record.winStreak }}
        .user__info--highLadder 天梯分：
          text {{ userInfo.record.highLadder }}
      .user__control
        .user__control--fighting
          a.user__control(href="../fighting/main") 天梯赛
        .user__control--rank
          a.user__control(href="../rank/main") 排行榜
        .user__control--issue
          a.user__control(href="../newIssue/main") 出题官
    .fixed--motto
      div 与其感慨路难行，不如马上出发
      div Better to run than curse the road.
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {

    }
  },
  async onLoad () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  methods: {

  },
  computed: mapState([
    'userInfo',
    'bgRandom'
  ]),
  onShareAppMessage: function (resMessage) {
    console.log(resMessage)
    // 分享回调已取消
    return {
      title: 'DOTA2你知多少',
      path: `/page/guide/main?openid=${this.$store.state.userInfo.openid}`
    }
  }
}
</script>

<style scoped lang="scss">
  .user__info {
    &--avatar {
      height: 128rpx;
      margin: 20rpx;
      text-align: center;
      img {
        width: 128rpx;
        height: 128rpx;
        border-radius: 50%;
      }
    }
    &--nickname {
      text-align: center;
      color: #000;
    }
    &--record {
      margin-top: 10rpx;
      color: #333;
      font-size: 16px;
      text {
        margin: 0 10rpx;
      }
    }
    &--highLadder {
      font-size: 16px;
      line-height: 40rpx;
      margin-top: 10rpx;
      text-align: center;
      text {
        font-size: 20px;
        color: #dbe0e4
      }
    }
  }
  .user__getInfo {
    button {
      width: 240rpx;
      height: 80rpx;
      background: none;
      &:after {
        border: none;
      }
      border-bottom: 1px solid #000;
      border-radius: 0;
    }
  }
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .user__control {
    margin-top: 20rpx;
    a {
      width: 240rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-bottom: 1px solid #000;
      display: block;
    }
  }
  .container {
    position: relative;
    &__header, &__content {
      width:80%;
      padding: 5%;
      background-color: rgba(255,255,255, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border-radius: 10rpx;
      box-sizing: border-box;
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
  }
</style>
