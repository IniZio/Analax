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

function Pins2Str(pins) {
  return JSON.stringify(pins.map(function (pin) {
    var pinTrackerDetail = JSON.stringify(pin.tracker[pin.tracker.hitType])
    // From JSON format to object format
    pinTrackerDetail.replace(/\\"/g,"\uFFFF")
    pinTrackerDetail = pinTrackerDetail.replace(/\"([^"]+)\":/g,"$1:").replace(/\uFFFF/g,"\\\'").replace(/\"/g, '\'')

    // If is pageview
    if (pin.tracker.hitType === 'pageview')
    return 'ga(\'send\','+
    '\'' + pin.tracker.hitType + '\',' +
    pinTrackerDetail +
    ')'

    // Else is event
    return 'document.getElementById(\''+ pin.pattern.replace(/#/g, '') + '\').addEventListener(\'' + pin.tracker.event.eventAction + '\',function() {ga(\'send\','+
      '\'' + pin.tracker.hitType + '\',' +
      pinTrackerDetail +
    ')})'
  }))
}

export default {
  checkGaExistance,
  Pins2Str
}
