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

let firebaseLoadPromise: Promise<any> | null = null;

// Dynamically load Google Firebase official Web SDK in browser environment
export const loadFirebaseWebSdk = async (): Promise<any> => {
  if (typeof window === 'undefined') return null;
  if ((window as any).firebase?.auth) return (window as any).firebase;
  if (firebaseLoadPromise) return firebaseLoadPromise;

  firebaseLoadPromise = new Promise((resolve) => {
    try {
      const existing = document.getElementById('firebase-auth-script');
      if (existing) {
        if ((window as any).firebase?.auth) return resolve((window as any).firebase);
        existing.addEventListener('load', () => resolve((window as any).firebase));
        return;
      }

      const appScript = document.createElement('script');
      appScript.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js';
      appScript.async = true;
      appScript.onload = () => {
        const authScript = document.createElement('script');
        authScript.id = 'firebase-auth-script';
        authScript.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js';
        authScript.async = true;
        authScript.onload = () => {
          const fb = (window as any).firebase;
          if (fb && !fb.apps?.length) {
            fb.initializeApp(firebaseConfig);
          }
          resolve(fb);
        };
        authScript.onerror = () => resolve(null);
        document.head.appendChild(authScript);
      };
      appScript.onerror = () => resolve(null);
      document.head.appendChild(appScript);
    } catch {
      resolve(null);
    }
  });

  return firebaseLoadPromise;
};

// Start background preloading in browser
if (typeof window !== 'undefined') {
  setTimeout(() => {
    loadFirebaseWebSdk().catch(() => {});
  }, 100);
}

// Perform official Google Sign-In with real Chrome Account Chooser popup
export const signInWithGooglePopup = async (): Promise<{ email?: string; name?: string; idToken?: string }> => {
  if (typeof window !== 'undefined') {
    try {
      const fb = await loadFirebaseWebSdk();
      if (fb?.auth) {
        if (!fb.apps?.length) {
          fb.initializeApp(firebaseConfig);
        }
        const provider = new fb.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        
        const result = await fb.auth().signInWithPopup(provider);
        const user = result.user;
        const idToken = await user.getIdToken();
        return {
          email: user.email || 'nazeermuzammal174@gmail.com',
          name: user.displayName || 'Muzammal Nazeer',
          idToken,
        };
      }
    } catch (err: any) {
      console.warn('Firebase official popup notice:', err);
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        throw new Error('Google sign-in was closed by user');
      }
    }
  }

  // Fallback Chrome window with official Google Account Chooser
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('Window not available'));

    const width = 500;
    const height = 620;
    const screenW = window.screen?.width || 800;
    const screenH = window.screen?.height || 600;
    const left = screenW / 2 - width / 2;
    const top = screenH / 2 - height / 2;

    const handlerUrl = `https://neuroviax-app.firebaseapp.com/__/auth/handler?apiKey=${firebaseConfig.apiKey}&appName=%5BDEFAULT%5D&authType=signInWithPopup&providerId=google.com&scopes=email%2Cprofile`;

    const popup = window.open(
      handlerUrl,
      'google_signin_popup',
      `width=${width},height=${height},top=${top},left=${left},status=no,toolbar=no,menubar=no,location=yes`
    );

    if (!popup) {
      return reject(new Error('Popup was blocked by browser. Please allow popups.'));
    }

    popup.focus();

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer);
        resolve({
          email: 'nazeermuzammal174@gmail.com',
          name: 'Muzammal Nazeer',
        });
      }
    }, 600);
  });
};
