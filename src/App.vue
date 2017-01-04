<template>
  <div id="alx-app" v-cloak>
    <Toolbar v-if="getEditorMode" />
    <!-- <iframe id="iframe" height="500" width="100%"></iframe> -->
    <div id="iframe"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import store from './store'
  import {
    mapActions,
    mapGetters
  } from 'vuex'

  export default {
    name: 'app',
    components: {
      Toolbar: require('./components/Toolbar'),
      Actionbox: require('./components/Actionbox')
    },
    data () {
      return {
        events: [],
        urlQueries: {}
        // editorReady: false,
        // frames: []
      }
    },
    methods: {
      ...mapActions(['toggleEditorMode'])
    },
    computed: {
      ...mapGetters(['getEditorMode']),
      searchParam: () => window.location.search.substr(1).split('&')
    },
    mounted () {
      this.toggleEditorMode(true)

      this.searchParam.forEach(function (item) { this.urlQueries[item.split('=')[0]] = item.split('=')[1] }.bind(this))

      var url = this.urlQueries.target

      if (url) {
        $.ajaxSetup({
          scriptCharset: 'utf-8', // or "ISO-8859-1"
          contentType: 'application/json; charset=utf-8'
        })
        $.getJSON('https://originwhatever.herokuapp.com/get?url=' + encodeURIComponent(url) + '&callback=?', function (data) {
          // Using div
          var html = '' + data.contents
          html = html.replace(new RegExp('(href|src)="/', 'g'), '$1="' + url + '/')
          $('#iframe').html(html)

          // // Using iframe
          // var d = $('#iframe')[0].contentWindow.document // contentWindow works in IE7 and FF
          // d.open(); d.close() // must open and close document object to start using it!

          // // now start doing normal jQuery:
          // $('body', d).append(data.contents)
        })
      }
    },
    watch: {
      'getEditorMode': function (mode, oldmode) {
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

          var Child = Vue.extend(require('./components/Selectionframe'))

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
      },
      'searchParam': function (newParam, oldParam) {
        newParam.forEach(function (item) { this.urlQueries[item.split('=')[0]] = item.split('=')[1] }.bind(this))
      },
      'urlQueries': function (newQueries) {
        $('#iframe').load(newQueries.target, {
          'Access-Control-Allow-Origin': '*'
        })
      }
    },
    store
  }

</script>
<style lang="scss" src="./style.scss"></style>
