import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBG7DOXIyU1pDJSLRd4WLd3q88m9ccuDxU",
    authDomain: "gadawere.firebaseapp.com",
    projectId: "gadawere",
    storageBucket: "gadawere.appspot.com",
    messagingSenderId: "14277108017",
    appId: "1:14277108017:web:0f7e2e2358e27a4fa99010",
    measurementId: "G-5VZP55Y7KE"
};

const app = initializeApp(firebaseConfig);

export default app;