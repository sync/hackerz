function register() {
  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
      ),
  );

  if (!isLocalhost && 'serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then(function(registration) {
          // eslint-disable-next-line no-console
          console.log('SW registered: ', registration);
        })
        .catch(function(registrationError) {
          // eslint-disable-next-line no-console
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

export { register };
