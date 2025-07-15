// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA3MCSrN-NLW2t7LYBdBw0atmrx7RfuT5o',
  authDomain: 'project-management-3204e.firebaseapp.com',
  projectId: 'project-management-3204e',
  storageBucket: 'project-management-3204e.firebasestorage.app',
  messagingSenderId: '426962662448',
  appId: '1:426962662448:web:8903b1501817f7354b29f5',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
}
