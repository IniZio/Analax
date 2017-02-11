import Vue from 'vue'
import store from './vuex/store'
import App from '~components/App.vue'

// Inject our app to website as first children of body
$(`<div id="app"></div>`).prependTo($('body').first())
// $('body').wrapInner(`<div id="app"></div>`)

const eventBus = new Vue()
Vue.prototype.$bus = eventBus

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
