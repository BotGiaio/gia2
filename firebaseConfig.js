// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'TU_API_KEY',
    authDomain: 'botgia-app.firebaseapp.com',
    projectId: 'botgia-app',
    storageBucket: 'botgia-app.appspot.com',
    messagingSenderId: '761221984883',
    appId: '1:761221984883:android:2b5f0574ce285a2f423006',
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializa el servicio de mensajería
const messaging = getMessaging(firebaseApp);

// Exporta la instancia de Firebase
export default firebaseApp;
