import Fly from 'flyio/dist/npm/wx'
const baseUrl = 'http://127.0.0.1:7278'
// const baseUrl = 'https://dota2.adityasui.com'
const fly = new Fly()

class Services {
  ValidateLogin (data) {
    return fly.post(`${baseUrl}/api/UserWechat/login`, data)
  }
  ValidateUser (data) {
    return fly.post(`${baseUrl}/api/UserWechat/ValidateUser`, data)
  }
  getQuestion (openid) {
    return fly.get(`${baseUrl}/api/getQuestion?openid=${openid}`)
  }
  updateRecord (openid, result, issueId) {
    return fly.get(`${baseUrl}/api/updateRecord?openid=${openid}&result=${result}&issueId=${issueId}`)
  }
  deleteTemporaryRecord (openid) {
    return fly.get(`${baseUrl}/api/delete/temporary?openid=${openid}`)
  }
  getUsers () {
    return fly.get(`${baseUrl}/api/users/list`)
  }
  saveOpenGID (data) {
    return fly.post(`${baseUrl}/api/openGid/new}`, data)
  }
  comparedOpenGID (data) {
    return fly.post(`${baseUrl}/api/openGid/compared`, data)
  }
  getGroupRanked (data) {
    return fly.post(`${baseUrl}/api/openGid/rankList`, data)
  }
}
export default new Services()
