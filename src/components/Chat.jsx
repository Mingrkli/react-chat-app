import "../styles/chat.css";
import React, { useEffect, useState } from "react";
// "addDoc" adds a doc to a collection, for this example adding a doc to the message collection
// "serverTimestamp" basically sets the time, great for ordering the messages :)
// "onSnapshot" will allow firebase to listen to the changes in our collection
import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Cookies from "universal-cookie";
import { convertFirebaseDate } from "./../utils/convertDate";
const cookies = new Cookies();

const Chat = (props) => {
    const { room } = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Making a reference to the messages collection in the firestore since you might have more than one collection
    const messagesRef = collection(db, "messages");

    // Listening to the collection for changes
    useEffect(() => {
        // query is...
        // 1st which collection, 2nd condition
        const queryMessages = query(
            messagesRef,
            where("room", "==", room),
            // We will have to create a index in the firebase website since apparently they don't like use doing this since the where is for the room, so the orderBy must be for the room but we can work around this by creating an index XD
            orderBy("createAt")
        );
        // 1st requires what query or changes we are listening to. 2nd is a call back that will run whenever there is any changes to the query
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                // This is confusing because it is since this is just the syntax for firebase
                // We have to create an empty array like "let messages = [];" and then for each doc in the snapshot we will push it with an object that has all the doc data and then the doc id
                // If it's the first time, then the id would be set, else if the id is already in the doc.data, it would just be "messages.push({ ...doc.data()});"
                messages.push({ ...doc.data(), id: doc.id });
            });

            setMessages(messages);

            let chat = document.querySelector(".messages");
            chat.scrollTop = chat.scrollHeight;
        });

        // Cleanup when the component is done completely, it might looks like nothing changed but it will stop many leaks, issues, and performance if not cleaned up
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sending to firebase
        // Check to see if the message is empty
        if (newMessage === "") return;

        // 1st is the reference, then the 2nd is the data that you want to add to that collection and that data is an object in which we can make it look like what ever we want or needed to be
        await addDoc(messagesRef, {
            text: newMessage, // user typed message
            createAt: serverTimestamp(), // messaged created at time for ordering
            user: auth.currentUser.displayName, // which user typed it
            room: room, // which rooms this messages belong to
            userImg: cookies.get("user-img"),
        });

        // When sending the message, set the input to ""
        setNewMessage("");
    };

    return (
        <div className="chat-app">
            <div className="header">
                <h1>Welcome to: {room}</h1>
            </div>
            <div className="messages">
                {messages.map((message) => (
                    <div
                        className={
                            message.user === cookies.get("display-name")
                                ? "message user"
                                : "message"
                        }
                        key={message.id}
                    >
                        <div className="chat-message">
                            <div>
                                <h2>{message.user}</h2>
                                <h3>{convertFirebaseDate(message.createAt)}</h3>
                            </div>

                            <img src={message.userImg} />
                        </div>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input
                    className="new-message-input"
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    // When we change the input, the input would also empty out as well
                    value={newMessage}
                ></input>
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
