import Vue from 'vue'
import iView from 'iview'
import App from './App.vue'

Vue.use(iView)

$(`<div id="app"></div>`).prependTo($('body').first())

new Vue({
  el: '#app',
  template: '<App></App>',
  components: { App }
})
