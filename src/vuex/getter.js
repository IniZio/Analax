export const getEditorMode = state => state.editorMode

export const getPins = (state, elPattern='') => {
  return state.pins.filter((item) => (elPattern === '' ? item.pattern : item.pattern === elPattern))
}
