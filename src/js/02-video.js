import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const key = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  throttle(function (data) {
    console.log(data);
    const time = data.seconds;
    localStorage.setItem(key, time);
  }, 1000)
);

const saveTime = localStorage.getItem(key);
player.setCurrentTime(saveTime || 0);
