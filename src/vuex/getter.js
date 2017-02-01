export const getEditorMode = state => state.editorMode

export const getPins = (state, elIdentifier='') => {
  return state.pins.filter((item) => (elIdentifier === '' ? item.identifier : item.identifier === elIdentifier))
}
