// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvv1T8hHWYxDjA8mQqygvh9YURX2x0NYU",
    authDomain: "pixscriptai.firebaseapp.com",
    projectId: "pixscriptai",
    storageBucket: "pixscriptai.appspot.com",
    messagingSenderId: "485035069242",
    appId: "1:485035069242:web:33e3c81fe40a8d5aed0a03"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

// auth.setPersistence("local");

// follow https://stackoverflow.com/questions/42878179/how-to-persist-a-firebase-login
(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();
