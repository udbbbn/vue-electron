/* eslint-disable vue/no-parsing-error */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import * as getters from './getters'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state,
  getters,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})
