<template>
  <div id="app">
    <Toolbar></Toolbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { setEditorMode } from './vuex/action'
import { getEditorMode } from './vuex/getter'

export default {
  data () {
    return {
      frames: []
    }
  },
  created () {
    this.setEditorMode(true)
  },
  components: {
    Toolbar: require('./components/Toolbar')
  },
  events: {
    'pause-editor': function () {
      this.exitMode()
    }
  },
  methods: {
    exitMode () {
      // Destroy selection frames and frames array
      for (let f of this.frames) { f.$destroy() }
      this.frames = []

      this.setEditorMode(false)
    }
  },
  vuex: {
    actions: {
      setEditorMode
    },
    getters: {
      getEditorMode
    }
  },
  watch: {
    'getEditorMode': function (mode, oldmode) {
      const toBeTracked = 'input,button,select'

      if (mode) {
          // TODO save the websites' default event handlers. reference: http://stackoverflow.com/questions/516265/jquery-unbind-event-handlers-to-bind-them-again-later '
          // if (!oldmode) this.events = $('*').data('events')

          // prevent default click actions
          // $('*').removeAttr('onclick')
          // $('*').unbind('click')
          $(toBeTracked).css('pointer-events', 'none')

          // $('*').not('[id^="alx"]').not('[class^="alx"]')
          //   .click(function (e) {
          //     e.preventDefault()
          //     return false
          //   })

          let Child = Vue.extend(Object.assign(require('./components/SelectFrame'), {
            parent: this
          }))

          // let frames = this.frames
          // let pushFrame = this.pushFrame
          let appThis = this

          // TODO a better way to avoid elements of live editor itself?
          $(toBeTracked).not('[id^="alx-"]').not('[class^="alx-"]')
            // .bind('mouseover', function () {
            .each(function () {
              if (!$(this).parent().hasClass('alx-selectframe')) {
                // Wrap the element with selectionFrame
                $(this).wrap('<div id="alx-selection"></div>')
                var selectedElem = $(this)[0].cloneNode(true)
                appThis.frames.push(new Child({
                  el: '#alx-selection',
                  parent: appThis,
                  data () { return { element: selectedElem } },
                }))
              }
            })
        } else {
          // TODO should undo all actions of when mode is true, now just refresh
          // $(toBeTracked).css('pointer-events', '')

        }
    }
  }
}
</script>

<style lang="less" src="./style.less"></style>
