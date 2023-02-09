// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB17p5zNCw84JaAeVmZd90BqZBEramaXro',
  authDomain: 'solo-project-27d4c.firebaseapp.com',
  databaseURL: 'https://solo-project-27d4c-default-rtdb.firebaseio.com',
  projectId: 'solo-project-27d4c',
  storageBucket: 'solo-project-27d4c.appspot.com',
  messagingSenderId: '930732170836',
  appId: '1:930732170836:web:a181e2a92de9350b4a97c1',
  measurementId: 'G-LGG73DTQDS',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
