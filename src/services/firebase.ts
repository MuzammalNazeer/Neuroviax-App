// Firebase Project Configuration for Neuroviax AI
export const firebaseConfig = {
  apiKey: 'AIzaSyBx2KHDClj_zqe3AD6PbdYjHHdxd0CpkQc',
  authDomain: 'neuroviax-app.firebaseapp.com',
  projectId: 'neuroviax-app',
  storageBucket: 'neuroviax-app.firebasestorage.app',
  messagingSenderId: '87683943032',
  appId: '1:87683943032:android:a1f8a84066bb0fc1d6fb8d',
  webClientId: '87683943032-qloquspiaa5umhtckf5t1bfbqtihlhii.apps.googleusercontent.com',
};

export const isFirebaseConfigured = () => Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

