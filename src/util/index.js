import api from './api'

function checkGaExistance() {
  var scripts = document.getElementsByTagName('script'),
    ga = true, // set to false if you don't want to check for ga.js
    ua = true, // set to false if you don't want to check for analytics.js
    dc = false, // set to false if you don't want to check for dc.js
    i = 0, len = 0
  if (ga || ua || dc) {
    for (i = 0, len = scripts.length ; i < len; i++) {
      if (ga && /www\.google-analytics\.com\/ga\.js/.test(scripts[i].src)) {
        return true
      }
      if (ua && /www\.google-analytics\.com\/analytics\.js/.test(scripts[i].src)) {
        return true
      }
      if (dc && /stats\.g\.doubleclick\.net\/dc\.js/.test(scripts[i].src)) {
        return true
      }
    }
  }
  return false
}

export default {
  checkGaExistance
}
