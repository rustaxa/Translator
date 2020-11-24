var getSubtitles = require('youtube-captions-scraper').getSubtitles;

getSubtitles({
  videoID: '', // youtube video id
  lang: 'en' // default: `en`
}).then(function(captions) {
  console.log(captions);
});