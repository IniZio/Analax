export const setEditorMode = ({ commit }, to) => {
  commit('TOGGLE_EDITORMODE', (to !== null? to : !store.editorMode))
}

export const addPins = ({commit}, pins) => {
  commit('PUSH_PINS', pins)
}
