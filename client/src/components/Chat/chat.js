//@ts-check

import React, { Component } from "react";
// import { Launcher } from "react-chat-window-timestamp-fork";
import "./chat.css";
import { Launcher } from "react-chat-window";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "../../firebase";

//const firebaseConfig = {
//apiKey: "AIzaSyDVI09hwundggfP9IrC4iChlVf2xlG4bTc",
//authDomain: "mymargdarshakaweb.firebaseapp.com",
//projectId: "mymargdarshakaweb",
//storageBucket: "mymargdarshakaweb.appspot.com",
//messagingSenderId: "285220513922",
//appId: "1:285220513922:web:3f4bab8e8070694fe6ec9b",
//measurementId: "G-BY7CXNRTWW",
//};

//if(!firebase.apps.length){
//var firebaseApp = firebase.initializeApp(firebaseConfig)
//}else{
//firebase.app()
//}
function isNan(x) {
  return x != x;
}

function Chat({ collection_name, userType }) {
  const firestore = firebase.firestore(firebase.app());

  console.log(collection_name);

  const messagesRef = firestore.collection(
    !collection_name ? "default" : collection_name
  );
  console.log(messagesRef);

  const query = messagesRef.orderBy("timestamp").limit(25);
  console.log(query);

  const [messages] = useCollectionData(query, { idField: "id" });

  console.log(messages);

  if (messages === undefined || messages === []) {
    messagesRef.add({
      author: userType,
      timestamp: new Date(),
      text: "Welcome to the chat!",
    });
  }

  const textMessages =
    messages === undefined
      ? []
      : messages.map((msg) => {
          console.log(msg);
          return {
            author: msg.author === userType ? "me" : "them",
            type: "text",
            data: { text: msg.text },
          };
        });

  console.log(textMessages);

  return (
    <div className="chat-container">
      <Launcher
        agentProfile={{
          teamName: "Chat with <mentor name>",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={(msg) => {
          // console.log(msg);
          if (msg.type === "text") {
            messagesRef.add({
              author: userType,
              timestamp: new Date(),
              text: msg.data.text,
            });
          } else if (msg.type === "emoji") {
            messagesRef.add({
              author: userType,
              timestamp: new Date(),
              text: msg.data.emoji,
            });
          }
        }}
        messageList={textMessages}
        showEmoji
      />
    </div>
  );
}

export default Chat;
