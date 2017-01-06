import Vue from 'vue'

var App = Vue.extend({
  name: 'app',
  template: `
    <h1>Hello i am popup</h1>
  `,
  mounted () {
    console.log('Hello!!!')
  }
})

var vm = new Vue({
  el: '#app',
  template: '<App/>',
  render: h => h(App)

})
