$(document).ready(function () {
  const START_VIDEO_ATTR_ID = '[data-uia="play-button"]';
  const VOLUME = 0.2;
  const GEOIPDB = 'https://geoip-db.com/json';
  const GEOHASH_PRECISION = 5;
  var usergeo = '00000';
  
  $.getJSON(GEOIPDB, function (data){
  	usergeo = Geohash.encode(data.latitude, data.longitude, GEOHASH_PRECISION);
  });

  equo.on('playSelectedVideo', data => {
    let currentVideo = document.getElementsByTagName('video')[0];
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play();
      } else {
        currentVideo.pause();
      }
    }
  });

  equo.on('turnUpVolume', data => {
    let currentVideo = document.getElementsByTagName('video')[0];
    if (currentVideo) {
      currentVideo.volume += VOLUME;
    }
  });

  equo.on('turnDownVolume', data => {
    let currentVideo = document.getElementsByTagName('video')[0];
    if (currentVideo) {
      currentVideo.volume -= VOLUME;
    }
  });

  equo.on('focusSearch', data => {
    let closeIcon = document.getElementsByClassName('icon-close')[0];
    if (closeIcon) {
      closeIcon.click();
    }
    let searchTab = document.getElementsByClassName('searchTab')[0];
    if (searchTab) {
      searchTab.click();
    }
  });

  $(document).on('click', START_VIDEO_ATTR_ID, function (event) {
    console.log('this is... ', this);
    let videoTitle = NetflixUtils.getVideoTitle(this);
    console.log('video playing is... ', videoTitle);
    event.preventDefault();
    equo.registerEvent({
      key: 'movies_played',
      segmentation: {
        title: videoTitle,
        geohash: usergeo
      }
    });
  });
});
