if (
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1'
) {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-WJEC2XPHNB');

  // Queue events immediately (above) but fetch and run gtag.js only once the
  // page has loaded and the main thread is idle, so it never competes with
  // first render.
  var loadGtag = function () {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-WJEC2XPHNB';
    document.head.appendChild(script);
  };
  var whenIdle = function () {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadGtag, { timeout: 4000 });
    } else {
      setTimeout(loadGtag, 2000);
    }
  };
  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });
}
