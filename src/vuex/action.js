export const setEditorMode = ({ dispatch }, to) => {
  dispatch('TOGGLE_EDITORMODE', (to !== null? to : !store.editorMode))
}

export const addPins = ({dispatch}, pins) => {
  dispatch('PUSH_PINS', pins)
}
