import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

// Modules
// import ... from './modules/...'

Vue.use(Vuex)

const isDebug = process.env.NODE_ENV !== 'production'

const state = {
  editorMode: false
}

const mutations = {
  TOGGLE_EDITOR (state, mode = null) {
    if (mode === null) {
      state.editorMode = !state.editorMode
    } else {
      state.editorMode = mode
    }
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: [
    require('./modules/trackers')
  ],
  strict: isDebug
})
