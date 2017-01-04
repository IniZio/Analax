// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'uikit/js/uikit.min.js'
import App from './App'

// $(`<div id="app"></div>`).prependTo($('body').first())

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

