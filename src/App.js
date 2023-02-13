import "./App.css";
import React, { useState, useRef } from "react";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
    // [] is called array destructing. The 1st value is the initial value, and the 2nd one is a function in which we can use to changed the value
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [room, setRoom] = useState("");

    const roomInputRef = useRef(null);

    const signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token"); // remove from cookies
        setIsAuth(false); // set the isAuth to false which means we don't have the "auth-token" in which will bring us to the sign into google screen
        setRoom(null); // set the room to null in case we are in a room
    };

    if (!isAuth) {
        return (
            <div className="App">
                <Auth setIsAuth={setIsAuth}></Auth>
            </div>
        );
    }

    return (
        <>
            {room ? (
                <Chat room={room}></Chat>
            ) : (
                <div className="room">
                    <label>Enter Room Name</label>
                    <input
                        ref={roomInputRef}
                        className="room-name-input"
                    ></input>
                    <button onClick={() => setRoom(roomInputRef.current.value)}>
                        Enter Chat
                    </button>
                </div>
            )}

            <div className="sign-out">
                <button onClick={signUserOut}>Sign Out</button>
            </div>
        </>
    );
}

export default App;
