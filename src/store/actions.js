import Services from './services'
export default {
  async ValidateLogin ({state}, data) {
    const res = await Services.ValidateLogin(data)
    console.log(res.data)
    if (res.data.stored) {
      state.userInfo = res.data.data
    } else {
      state.sessionKey = res.data.data.session_key
    }
    return res.data.data
  },
  async ValidateUser ({ state }, data) {
    const res = await Services.ValidateUser(data)
    console.log(res.data.data)
    state.userInfo = res.data.data

    return res.data.data
  },
  async getQuestion ({ state }) {
    const res = await Services.getQuestion(state.userInfo.openid)
    console.log(res.data.data)
    state.question = res.data.data

    return res.data.data
  },
  async updateRecord ({ state }, result) {
    const res = await Services.updateRecord(state.userInfo.openid, result, state.question._id)
    console.log(res.data.data)
    state.userInfo.record = res.data.data

    return res.data.data
  },
  async deleteTemporaryRecord ({state}) {
    const res = await Services.deleteTemporaryRecord(state.userInfo.openid)
    state.userInfo.record = res.data.data
    return res.data.data
  }
}
