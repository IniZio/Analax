import Vue from 'vue'
import iView from 'iview'
import store from './vuex/store'
import App from './App.vue'

Vue.use(iView)

// var children = $('body').html()

// Inject our app to website as first children of body
$(`<div id="app"></div>`).prependTo($('body').first())
// $('body').wrapInner(`<div id="app"></div>`)

new Vue({
  el: '#app',
  template: '<App></App>',
  components: { App },
  store
})
