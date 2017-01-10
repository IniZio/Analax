<template>
  <div id="app">
    <Toolbar></Toolbar>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      mode: false
    }
  },
  created () {
    this.mode = true
  },
  components: {
    Toolbar: require('./components/Toolbar'),
    ActionPopup: require('./components/ActionPopup')
  },
  watch: {
    'mode': function (mode, oldmode) {
      if (mode) {
          if (!oldmode) this.events = $('*').data('events')
          // prevent default click actions
          // TODO save the websites' default event handlers. reference: http://stackoverflow.com/questions/516265/jquery-unbind-event-handlers-to-bind-them-again-later '
          $('*').removeAttr('click')
          $('*').unbind('click')
          $('*').not('[id^="alx"]').not('[class^="alx"]')
            .click(function (e) {
              e.preventDefault()
              return false
            })

          const alxFrame = `<div id="selection"></div>`

          var Child = Vue.extend(require('./components/SelectFrame'))

          // TODO a better way to avoid elements of live editor itself?
          $('input,button,select').not('[id^="alx"]').not('[class^="alx"]')
            .bind('mouseover', function () {
              if (!$(this).parent().hasClass('alx-frame')) {
                $(this).wrap(alxFrame)
                var orig = $(this)[0]
                var frame = new Child({
                  el: '#selection',
                  data () {
                    return {
                      element: orig
                    }
                  },
                  created () {
                    console.log(this.element)
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
  }
}
</script>

<style lang="less" src="./style.less"></style>
