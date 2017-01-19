export const setEditorMode = ({ dispatch }, to) => {
  dispatch('TOGGLE_EDITORMODE', (to !== null? to : !store.editorMode))
}

export const addTrackers = ({dispatch}, trackers) => {
  dispatch('PUSH_TRACKERS', trackers)
}
