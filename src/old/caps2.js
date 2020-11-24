var getSubtitles = require('youtube-captions-scraper').getSubtitles;
 
getSubtitles({
  videoID: 'jK0IHubzHZo', // youtube video id
  lang: 'en' // default: `en`
}).then(function(captions) {
  console.log(captions);
});