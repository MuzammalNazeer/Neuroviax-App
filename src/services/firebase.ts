// Firebase Project Configuration for Neuroviax AI
export const firebaseConfig = {
  apiKey: 'AIzaSyDu6hNhV1dJ1hhGhHMCpREH8BYR_VzdJ6w',
  authDomain: 'neuroviax-a158e.firebaseapp.com',
  projectId: 'neuroviax-a158e',
  storageBucket: 'neuroviax-a158e.firebasestorage.app',
  messagingSenderId: '1013246831383',
  appId: '1:1013246831383:web:0f2a320eb6ba4092626552',
  measurementId: 'G-7P0VZGKJ7X',
};

export const isFirebaseConfigured = () => Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
