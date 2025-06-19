// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBVSmf4LvPeLAGqesemnfGTc4YvnSgCAy8',
	authDomain: 'login-chat-web-4047f.firebaseapp.com',
	projectId: 'login-chat-web-4047f',
	storageBucket: 'login-chat-web-4047f.firebasestorage.app',
	messagingSenderId: '460116449925',
	appId: '1:460116449925:web:c5777f56cf01a0161427ec',
	measurementId: 'G-LZ6WBVP955'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
