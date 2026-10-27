// Keep local previews and alternate hosts out of the production statistics.
(() => {
  if (location.hostname !== 'cyprinus.algonavis.com') return;

  const beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  // Public site identifier supplied by Cloudflare, not an account API key.
  beacon.dataset.cfBeacon = JSON.stringify({ token: 'ff6cdd929d0c4b8ead77ae72f858e277' });
  document.body.append(beacon);
})();
