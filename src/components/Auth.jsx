import React from "react";
import { auth, provider } from "../firebase-config.js";
// "signInWithPopup" is used whenever you use anything with a popup
import { signInWithPopup } from "firebase/auth";

// Whenever you want to use cookies
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Auth = (props) => {
    const { setIsAuth } = props;

    // Most commonly we will be using the async so that we can be able to use the await keyword
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // "auth-token" can be whatever name you want
            // the following is basically like "localStorage.setItem()" but for cookies so thats cool
            cookies.set("auth-token", result.user.refreshToken);
            cookies.set("display-name", result.user.displayName);
            cookies.set("user-img", result.user.photoURL);

            setIsAuth(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="auth">
            <h1>Sign In With Google To Continue</h1>
            <button onClick={signInWithGoogle} className="btn-sign-in">
                Sign In With Google
            </button>
        </div>
    );
};

export default Auth;
