self.addEventListener('install', function (event) {
   console.log('SW Installed at ', new Date().toLocaleDateString());
});

self.addEventListener('activate', function(event) {
    console.log('SW activated at ', new Date().toLocaleDateString());
});