<template>
  <div id="alx-app">
    <!-- <Toolbar></Toolbar> -->
    <!-- <Tracker-overview></Tracker-overview> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      frames: []
    }
  },
  computed: {
    ...mapGetters([
      'getEditorMode'
    ])
  },
  created () {
    this.setEditorMode(true)
  },
  components: {
    Toolbar: require('~components/Toolbar'),
    TrackerOverview: require('~components/TrackerOverview')
  },
  events: {
    // 'pause-editor': function () {
    //   this.exitMode()
    // }
  },
  methods: {
    ...mapActions([
      'setEditorMode'
    ])
    // exitMode () {
    //   // Destroy selection frames and frames array
    //   for (let f of this.frames) { f.$destroy() }
    //   this.frames = []

    //   this.setEditorMode(false)
    // }
  },
  watch: {
    'getEditorMode': function (editorMode) {
      const trackableTags = ['input', 'button', 'a', 'select']

      if (editorMode) {
          // NOTE save the websites' default event handlers. reference: http://stackoverflow.com/questions/516265/jquery-unbind-event-handlers-to-bind-them-again-later '
          // var events = $('*').data('events')

          let Child = Vue.extend(Object.assign(require('./components/Pin'), {
            parent: this
          }))

          let appThis = this

          $(trackableTags.join(','))
            // not children of alx's
            .not((trackableTags.map((item) =>
              JSON.stringify('[id^="alx-"] ' + item + ',[class^="alx-"] ' + item)))
            .join(',')
            .replace(/\\"/g, '\'') // use single quotes
            .replace(/\"/g, '')) // remove quotes between items

            // Prevent site's own click actions
            .css('pointer-events', 'none').removeAttr('onclick').unbind('click')
            .each(function () {
              if (!$(this).parent().hasClass('alx-pinframe')) {
                // Wrap the element with Pin component
                var selectedElem = ($(this).clone(true))[0]
                $(this).wrap('<alx-pin></alx-pin>')
                appThis.frames.push(new Child({
                  el: 'alx-pin',
                  data () { return { element: selectedElem } },
                }))
              }
            })
        } else {
          // Remove unbinds and resume site's own click actions?
          // $(trackableTags).css('pointer-events', '')
        }
    }
  }
}
</script>

<style lang="less" src="./style.less"></style>
