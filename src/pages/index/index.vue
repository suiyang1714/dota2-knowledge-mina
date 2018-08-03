<template lang="pug">
  .container(:style="{ backgroundImage: 'url( https://dota2qiniu.adityasui.com/dota_bg_'+ bgRandom +'.jpg)' }")
    .container__header(v-if="userInfo")
      .user__info
        .user__info--avatar
          img(:src="userInfo.avatarUrl")
        .user__info--nickname {{ userInfo.nickname }}
        .user__info--record(v-if="userInfo.record")
          text 答对 {{ userInfo.record.victory }}
          text 答错 {{ userInfo.record.failure }}
          text 连胜 {{ userInfo.record.winStreak }}
        .user__info--highLadder 天梯分：
          text {{ userInfo.record.highLadder }}
      .user__control
        .user__control--fighting
          a.user__control(href="../fighting/main") 答题
    .container__content(v-else)
      .user__getInfo
        button(open-type="getUserInfo", lang="zh_CN", @getuserinfo="onGotUserInfo") 获取用户信息
    .fixed--motto
      div 与其感慨路难行，不如马上出发
      div Better to run than curse the road.
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      encryptedData: String,
      iv: String,
      signature: String
    }
  },
  methods: {
    onGotUserInfo: async function (ev) {
      // this.$store.state.userInfo = ev.mp.detail.userInfo
      const { encryptedData, iv, signature } = ev.mp.detail
      await this.$store.dispatch('ValidateUser', {
        encryptedData: encryptedData,
        iv: iv,
        signature: signature,
        sessionKey: this.$store.state.sessionKey
      })
    }
  },
  computed: mapState([
    'userInfo',
    'bgRandom'
  ])
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
    &--fighting {
      a {
        width: 240rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-bottom: 1px solid #000;
        display: block;
      }
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
      position: fixed;
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
