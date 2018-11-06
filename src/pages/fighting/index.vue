<template lang="pug">
  .container(:style="{ backgroundImage: 'url( https://dota2qiniu.adityasui.com/dota_bg_'+ bgRandom +'.jpg)'}")
    .content
      .question(v-if="question")
        .question--title {{ question.issue }}
        ul.question--options
          li(v-for="(item, index) in question.options", v-bind:key="index", @click="commitAnswer(index, question.answer)", :class="Active === index ? Active === question.answer ? 'right' : 'wrong' : ''") {{ item }}
        .question--result(v-if="showErrors") {{ Errors }}
        .other__challengeFailure(v-if="result != null && !result")
          .route
            a(href="../index/main") 返回到首页
        .other__challengeSuccessfu(v-else)
          button.question--nextBtn(v-if="checked", @click="refreshQuestion") 下一题
      .finish(v-else)
        .tips  全部答完了
        .route
          a(href="../index/main") 返回到首页
    .fixed--motto
      div 与其感慨路难行，不如马上出发
      div Better to run than curse the road.
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      showErrors: false,
      Errors: null,
      Active: Number,
      checked: false,
      result: null
    }
  },
  async onShow () {
    // await this.$store.dispatch('getQuestion')
  },
  async onLoad () {
    this.result = null
    this.showErrors = false
    this.Errors = null
    this.Active = null
    this.checked = false
    await this.$store.dispatch('getQuestion')
  },
  methods: {
    commitAnswer: async function (option, answer) {
      if (!this.checked) {
        this.Active = option
        if (option === answer) {
          this.showErrors = true
          this.Errors = '恭喜你答对了'
          this.result = true
        } else {
          this.showErrors = true
          this.Errors = '很遗憾你答错了'
          this.result = false
        }
        this.checked = true
        console.log(this.result)
        await this.$store.dispatch('updateRecord', this.result)
      }
    },
    refreshQuestion: async function () {
      this.result = null
      this.showErrors = false
      this.Errors = null
      this.Active = null
      this.checked = false
      await this.$store.dispatch('getQuestion')
    }
  },
  computed: mapState([
    'question',
    'bgRandom'
  ]),
  async onUnload () {
    await this.$store.dispatch('deleteTemporaryRecord')
  },
  async onHide () {
    await this.$store.dispatch('deleteTemporaryRecord')
  }
}
</script>

<style scoped lang="scss">
  .content {
    width: 80%;
    padding: 5%;
    background-color: rgba(255,255,255, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 10rpx;
    box-sizing: border-box;
    .route {
      text-align: center;
      a {
        width: 240rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-bottom: 1px solid #000;
        display: inline-block;
      }
    }
    .finish {
      .tips {
        text-align: center;
      }
    }
  }
  .question {
    &--title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
    &--options {
      li {
        background:#fff;
        border-radius:10rpx;
        height:80rpx;
        line-height:40rpx;
        margin-bottom:10rpx;
        font-size:28rpx;
        color:#333;
        text-align:center;
        padding:10rpx 10rpx;
        display:flex;
        justify-content:center;
        align-items:center;
        &.right {
          color: #fff;
          background-color: #41B883;
        }
        &.wrong {
          color: #fff;
          background-color: #f00;
        }
      }
    }
    &--result {
      text-align:center;
      font-size:16px;
      color:#fff;
      margin:20rpx 0 10rpx;
    }
    &--nextBtn {
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
