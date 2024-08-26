importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');


  firebase.initializeApp({
    apiKey: "AIzaSyDktoCMMyHVt2TrH8jEhHiYPOoaEqHTTT4",
    authDomain: "stockesmaze.firebaseapp.com",
    projectId: "stockesmaze",
    storageBucket: "stockesmaze.appspot.com",
    messagingSenderId: "801415929704",
    appId: "1:801415929704:web:ee4ae80d086ff7c40500dd",
    measurementId: "G-HM5M67ZJZS"
  });

  const messaging = firebase.messaging();

  self.addEventListener('message', function(event) {
    console.log('Received message in SW:', event.data);
  });
  
  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message in SW:', payload);
  
    // Broadcast the message to the clients (the main page)
    self.clients.matchAll().then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage(payload);
      });
    });
  });
  
  