

const firebaseConfig = {
    apiKey: "AIzaSyDktoCMMyHVt2TrH8jEhHiYPOoaEqHTTT4",
    authDomain: "stockesmaze.firebaseapp.com",
    projectId: "stockesmaze",
    storageBucket: "stockesmaze.appspot.com",
    messagingSenderId: "801415929704",
    appId: "1:801415929704:web:ee4ae80d086ff7c40500dd",
    measurementId: "G-HM5M67ZJZS"
  };

  firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();


navigator.serviceWorker.register('/js/firebase-messaging-sw.js')
  .then((registration) => {
    messaging.useServiceWorker(registration);


    return Notification.requestPermission();
  })
  .then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      // Get FCM token
      messaging.getToken({ vapidKey: 'BH0X6qI6FRt3_FyvSoOrBGBIK9pw3xKlqbmx2a5tDbHk02_jIWltkBH_NR_GLfQYPPdPIk0zTt3Z-GwYfIPyUyE' })
        .then((currentToken) => {
          if (currentToken) {
            console.log('FCM Token:', currentToken);
          } else {
            console.error('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.error('An error occurred while retrieving token. ', err);
        });
    } else {
      console.error('Notification permission denied.');
    }
  });


// show notification banner




function showToast(title, message) {
  console.log('Creating toast with title:', title, 'and message:', message);

  const toast = document.createElement('div');
  toast.classList.add('toast');
  
  toast.innerHTML = `
    <div class="toasthead">
      <span>${title}</span>
      <button class="close-btn">&times;</button>
    </div>
    <span class="toastbody">${message}</span>
  `;


  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.right = '20px';
  toast.style.backgroundColor = 'rgb(8 186 144 / 78%)';
  // toast.style.color = '#fff';
  toast.style.padding = '15px';
  toast.style.paddingTop = '5px'
  toast.style.border = 'none'
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
  toast.style.fontSize = '16px';
  toast.style.lineHeight = 'normal'
  toast.style.zIndex = '9999';
  toast.style.display = 'block';
  
 
  const toastHeader = toast.querySelector('.toasthead');
  toastHeader.style.display = 'flex';
  toastHeader.style.justifyContent = 'space-between';
  toastHeader.style.alignItems = 'center';

  
  const closeButton = toast.querySelector('.close-btn');
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.color = '#fff';
  closeButton.style.fontSize = '22px';
  closeButton.style.fontWeight = '700'
  closeButton.style.cursor = 'pointer';

  
  closeButton.addEventListener('click', () => {
    console.log('Toast closed by user');
    toast.remove();
  });


  document.body.appendChild(toast);
  console.log('Toast added to the DOM');

  
  setTimeout(() => {
    if (document.body.contains(toast)) {
      console.log('Automatically removing toast from the DOM');
      toast.remove();
    }
  }, 900000);
}




if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/js/firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    });

  navigator.serviceWorker.addEventListener('message', function(event) {
    const payload = event.data;
    console.log('Received message in main script:', payload);

    if (payload && payload.notification) {
      const { title, body } = payload.notification;
      showToast(title, body);
    } else {
      console.log('No notification data found');
    }
  });
}


