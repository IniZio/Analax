import firebase from 'firebase'
import { checkGaExistance, Pinbox2Str } from './util'

// 0_1. Add GA script snippet to end of body if it does not exist
if (!checkGaExistance()) {
  // User's GA tracking ID ('UA-XXXXX-Y')
  const ga_trackId = ''

  let ga_el = document.createElement('script')
  ga_el.type = 'text/javascript'
  ga_el.text = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');` +
    `ga('create','` + ga_trackId + `', 'auto');`

  $(document.currentScript)[0].before(ga_el)
}

// 0_2. Initialize firebase
firebase.initializeApp({
  apiKey: 'AIzaSyAWjwqrl27UTw8lKTl5aO8IrOYK3vcTAew',
    authDomain: 'analax-151714.firebaseapp.com',
    databaseURL: 'https://analax-151714.firebaseio.com',
    storageBucket: 'analax-151714.appspot.com',
    messagingSenderId: '355135651676'
})

// 1. Grab GA trackers for website
firebase.database().ref('localhost/pinbox/').once('value').then((pinbox) => {
  pinbox = pinbox.val()

  for (let pin of pinbox) {
    var pinTrackerDetail = JSON.stringify(pin.tracker[pin.tracker.hitType])
      // From JSON format to object format
      pinTrackerDetail.replace(/\\"/g,"\uFFFF")
      pinTrackerDetail = pinTrackerDetail.replace(/\"([^"]+)\":/g,"$1:").replace(/\uFFFF/g,"\\\'").replace(/\"/g, '\'')

    document.getElementById(pin.pattern.slice(1)).addEventListener(pin.tracker[pin.tracker.hitType].eventAction, function () {
      ga('send', pin.tracker.hitType, pinTrackerDetail)
    })
  }
})

// 2. See if the google-signin is authenticated to grab analax editor
