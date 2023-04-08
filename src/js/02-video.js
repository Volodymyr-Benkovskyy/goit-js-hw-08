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

function timeUpDate(data) {
  console.log(data);
  const time = data.seconds;
  localStorage.setItem(key, time);
}

player.on('timeupdate', throttle(timeUpDate, 1000));

const saveTime = localStorage.getItem(key);
player.setCurrentTime(saveTime || 0);
