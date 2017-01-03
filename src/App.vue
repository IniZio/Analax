<template>
  <div id="alx-app" v-cloak>
    <Toolbar v-if="getEditorMode" />
  </div>
</template>
<script>
  import Vue from 'vue'
  import store from './store'
  import {
    mapActions,
    mapGetters
  } from 'vuex'

  // import Toolbar from './components/Toolbar'
  // import Selectionframe from './components/Selectionframe'
  // import Actionbox from './components/Actionbox'

  export default {
    name: 'app',
    components: {
      Toolbar: require('./components/Toolbar'),
      Actionbox: require('./components/Actionbox')
    },
    data () {
      return {
        // editorReady: false,
        // frames: []
      }
    },
    methods: {
      ...mapActions(['setEditorMode'])
    },
    computed: {
      ...mapGetters(['getEditorMode'])
    },
    mounted () {
      this.setEditorMode(true)
    },
    watch: {
      'getEditorMode': function (mode) {
        if (mode) {
          // prevent default click actions
          // TODO save the websites' default event handlers. reference: http://stackoverflow.com/questions/516265/jquery-unbind-event-handlers-to-bind-them-again-later '
          $('*').unbind('click')
          $('*').not('[id^="alx"]').not('[class^="alx"]')
            .click(function (e) {
              e.preventDefault()
              return false
            })

          const alxFrame = `<div id="selection"></div>`

          var Child = Vue.extend(require('./components/Selectionframe'))

          // TODO a better way to avoid elements of live editor itself?
          $('input,button').not('[id^="alx"]').not('[class^="alx"]')
            .mouseover(function () {
              if (!$(this).parent().hasClass('alx-frame')) {
                $(this).wrap(alxFrame)
                var orig = $(this)[0]
                var frame = new Child({
                  el: '#selection',
                  data () {
                    return {
                      element: orig
                    }
                  }
                })
              } else $(this).parent().css('border-color', 'orange')
            })
            // .click(function () {
            //   if (!$(this).parent().hasClass('alx-frame')) {
            //     $(this).wrap(alxFrame)
            //   } else $(this).parent().css('border-color', 'red')
            // })
        } else {
          // TODO should undo all actions of when mode is true, now just refresh
        }
      }
    },
    store
  }

</script>
<style lang="scss" src="./style.scss"></style>
