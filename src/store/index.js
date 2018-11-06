import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: null,
    sessionKey: null,
    question: {},
    bgRandom: null,
    users: []
  },
  getters,
  actions,
  mutations
})

export default store
