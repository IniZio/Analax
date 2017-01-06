/**
 * toggle editor according to desired mode
 * @param mode: bool
 */
export const toggleEditorMode = ({commit},
  mode = null
) => {
  commit('TOGGLE_EDITOR', mode)
}
