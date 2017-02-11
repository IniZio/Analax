import Vue from 'vue'
import store from './vuex/store'
import App from '~components/App.vue'

// Inject our app to website as first children of body
$(`<alx-app></alx-app>`).prependTo($('body').first())
// $('body').wrapInner(`<alx-app>`)

const eventBus = new Vue()
Vue.prototype.$bus = eventBus

new Vue({
  el: 'alx-app',
  render: h => h(App),
  store
})
