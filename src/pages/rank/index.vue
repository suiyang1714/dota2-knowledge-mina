<template lang="pug">
  .container(:style="{ backgroundImage: 'url( https://dota2qiniu.adityasui.com/dota_bg_'+ bgRandom +'.jpg)'}")
    .content
      ul.scrollBox
        li.item(v-for="userInfo in users", v-bind:key="userInfo._id")
          .item__left
            img(:src="userInfo.avatarUrl")
          .item__right
            .user__info--nickname {{ userInfo.nickname }}
            .user__info--record(v-if="userInfo.record")
              text 答对：{{ userInfo.record.victory }}
              text 答错：{{ userInfo.record.failure }}
              text 连胜：{{ userInfo.record.winStreak }}
            .user__info--highLadder
              text 天梯分：{{ userInfo.record.highLadder }}
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
    await this.$store.dispatch('getUsers')
  },
  computed: mapState([
    'users',
    'bgRandom'
  ]),
  onShareAppMessage: function (res) {
    return {
      title: 'DOTA2你知多少',
      path: '/page/guide/main'
    }
  }
}
</script>

<style scoped lang="scss">
  .content {
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .scrollBox {
    width: 100%;
    overflow-y:scroll;
    .item {
      padding: 5%;
      background-color: rgba(255,255,255, 0.5);
      border-radius: 10rpx;
      box-sizing: border-box;
      display: flex;
      margin-bottom: 20rpx;
      &__left {
        height: 128rpx;
        margin-right: 20rpx;
        img {
          width: 128rpx;
          height: 128rpx;
          border-radius: 50%;
        }
      }
      &__right {
        flex: 1;
        font-size: 14px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        div {
          flex: 1;
        }
        .user__info {
          &--nickname {
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            margin-bottom: 10rpx;
          }
          &--record {
            display: flex;
            text {
              flex: 1;
            }
          }
        }
      }
    }
  }
  .container {
    position: relative;
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
