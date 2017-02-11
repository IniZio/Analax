import util from './util'

// 0. Add GA script snippet to end of body if it does not exist
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
// 1. Grab GA trackers for website

// 2. See if the google-signin is authenticated to grab analax editor
