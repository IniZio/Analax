<template>
  <div id="alx-app">
    <Toolbar></Toolbar>
    <Tracker-overview></Tracker-overview>
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
    Toolbar: require('./components/Toolbar'),
    TrackerOverview: require('./components/TrackerOverview')
  },
  events: {
    // 'pause-editor': function () {
    //   this.exitMode()
    // }
  },
  methods: {
    // exitMode () {
    //   // Destroy selection frames and frames array
    //   for (let f of this.frames) { f.$destroy() }
    //   this.frames = []

    //   this.setEditorMode(false)
    // }
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
      const toBeTracked = ['input', 'button', 'a', 'select']

      if (mode) {
          // NOTE save the websites' default event handlers. reference: http://stackoverflow.com/questions/516265/jquery-unbind-event-handlers-to-bind-them-again-later '
          // var events = $('*').data('events')

          let Child = Vue.extend(Object.assign(require('./components/SelectFrame'), {
            parent: this
          }))

          let appThis = this

          $(toBeTracked.join(','))
            // not children of alx's
            .not((toBeTracked.map((item) =>
              JSON.stringify('[id^="alx-"] ' + item + ',[class^="alx-"] ' + item)))
            .join(',')
            .replace(/\\"/g, '\'') // use single quotes
            .replace(/\"/g, '')) // remove quotes between items

            // Prevent site's own click actions
            .css('pointer-events', 'none') // May not work with old browsers?
            .removeAttr('onclick')
            .unbind('click')
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
          // Remove unbinds and resume site's own click actions?
          // $(toBeTracked).css('pointer-events', '')
        }
    }
  }
}
</script>

<style lang="less" src="./style.less"></style>
