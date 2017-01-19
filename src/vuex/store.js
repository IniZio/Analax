import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  editorMode: false,
  trackers: []
}

const mutations = {
  TOGGLE_EDITORMODE (state, to) {
    state.editorMode = to
  },
  PUSH_TRACKERS(state, trackers) {
    for (let tracker of trackers) {
      state.trackers.push(tracker)
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  modules: {
  },
  strict: true
})
