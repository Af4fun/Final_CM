/* eslint-disable no-sequences */
function t (t, e, n) {
  var i; var r; var o = document.querySelector('meta[name="viewport"]'); var a = document.documentElement.clientWidth;
  switch (t) {
    case 'fixed':
      i = e,
      r = a / e;
      break;
    case 'rem':
      var s = window.devicePixelRatio || 1;
      i = a * s,
      r = 1 / s,
      document.documentElement.style.fontSize = 100 * (a * s / e) + 'px';
  }
  o.setAttribute('content', 'width=' + i + ',initial-scale=' + r + ',maximum-scale=' + r + ',minimum-scale=' + r),
  n && window.addEventListener('DOMContentLoaded', function () {
    document.body.style.fontSize = 50 / r + 'px';
  });
}

t('fixed', 750);
