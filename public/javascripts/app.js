if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker/sw.js')
      .then(function() {
        console.log('SW registered');
      });
  }