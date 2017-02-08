import Vue from 'vue'
import iView from 'iview'
import util from './util'
import store from './vuex/store'
import App from './App.vue'

Vue.use(iView)

// Add GA script snippet to end of body if it does not exist
if (!util.checkGaExistance()) {
  // User's GA tracking ID ('UA-XXXXX-Y')
  const ga_trackId = ''

  let ga_el = document.createElement("script")
  ga_el.type = "text/javascript"
  ga_el.text = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');` +
    `ga('create','` + ga_trackId + `', 'auto');`

  $(document.currentScript)[0].before(ga_el)
}

// Inject our app to website as first children of body
$(`<div id="app"></div>`).prependTo($('body').first())
// $('body').wrapInner(`<div id="app"></div>`)


new Vue({
  el: '#app',
  template: '<App></App>',
  components: { App },
  store
})
