import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useState } from 'react';

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

export const db = getFirestore(app);

export const storage = getStorage(app);
