import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import * as getters from './getter'

Vue.use(Vuex)

// Pin example:
// {
// hitType:           'event', // whether is event/pageview/social associations... aka. type of tracker
//   event:           {
//     eventCategory: 'default', // category of the object
//     eventAction:   'click', // the intereventAction, set nonIntereventAction field in GA tracker if non-intereventAction event
//     eventLabel:    '', // for categorising the event
//     value:         '', // the number that is associated with the event
//     transport:     '' // need to set as beacon if is form
//   },
//   pageview:        {}
// }


const state = {
  editorMode: false,
  pins: []
}

const mutations = {
  TOGGLE_EDITORMODE (state, to) {
    state.editorMode = to
  },
  PUSH_PINS(state, pins) {
    for (let pin of pins) {
      // TODO add multple trackers to existing matched pin instead of as new pin
      // if (state.pins.filter((item) => item.pattern === pin.pattern).length > 0) {
      // }
      state.pins.push(pin)
    }
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
  },
  strict: true
})
