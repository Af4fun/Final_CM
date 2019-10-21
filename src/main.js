import '@/styles/styles.less';
import FastClick from 'fastclick';
import Nerv from 'nervjs';
import Bgm from '@/assets/audio/music.mp3';
import App from './app.jsx';
// import { wxConfig } from '@/utils/wxconfig';

window.videoUrl = 'https://outin-c6f82dc5d5b911e99ad400163e1a625e.oss-cn-shanghai.aliyuncs.com/sv/12142eeb-16def4f975a/12142eeb-16def4f975a.mp4?Expires=1571682363&OSSAccessKeyId=LTAI8bKSZ6dKjf44&Signature=y95xtyIL0%2BwF0ICnQmVKtm5n%2FFE%3D';
const player = document.createElement('audio');
const hasVideo = !!player.canPlayType;
player.src = Bgm;
player.autoplay = false;
player.loop = true;
document.body.append(player);
if (hasVideo) {
  Nerv.$bgm = player;
}
if ('addEventListener' in document && 'ontouchstart' in window) {
  FastClick.prototype.focus = (targetElement) => {
    targetElement.focus();
  };
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
  }, false);
}
document.getElementById('share_arrow').addEventListener('click', function () {
  this.style.display = 'none';
});

window.saveList = Array.apply(undefined, { length: 8 });

// wxConfig();

Nerv.render(
  <App />,
  document.getElementById('app')
);
