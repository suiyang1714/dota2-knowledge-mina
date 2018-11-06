import Services from './services'
export default {
  async ValidateLogin ({state}, data) {
    const res = await Services.ValidateLogin(data)
    console.log(res.data)
    if (res.data.stored) {
      state.userInfo = res.data.data
    }
    state.sessionKey = res.data.sessionKey
    return res.data
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
  },
  async getUsers ({state}) {
    const res = await Services.getUsers()
    console.log(res.data)
    state.users = res.data.data
    return res.data.data
  },
  async saveOpenGID ({state}, data) {
    const res = await Services.saveOpenGID(data)
    console.log(res.data)

    return res.data.data
  },
  async comparedOpenGID ({state}, data) {
    const res = await Services.comparedOpenGID(data)
    console.log(res.data)

    return res.data.data
  },
  async getGroupRanked ({state}, data) {
    const res = await Services.getGroupRanked(data)
    console.log(res.data)

    return res.data.data
  }
}
