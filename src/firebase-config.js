// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// "getAuth" is used whenever you want to use authentication in your project
// "GoogleAuthProvider" is telling firebase that your using google for the authentication
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsr_K7fGmyrNkKqAlLwo8rqVA7cR9U6aU",
    authDomain: "chat-app-d860e.firebaseapp.com",
    projectId: "chat-app-d860e",
    storageBucket: "chat-app-d860e.appspot.com",
    messagingSenderId: "819092160269",
    appId: "1:819092160269:web:caaf16d35ddb9c65843a44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // "(app)" is where you want to set up authentication with
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
