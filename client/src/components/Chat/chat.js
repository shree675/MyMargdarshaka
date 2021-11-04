//@ts-check

import React, { useEffect } from "react";
// import { Launcher } from "react-chat-window-timestamp-fork";
import "./chat.css";
import { Launcher } from "react-chat-window";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "../../firebase";

function isNan(x) {
  return x != x;
}

function Chat({ collection_name, userType, name }) {
  const firestore = firebase.firestore(firebase.app());

  // console.log(collection_name);
  // collection_name = "collection0";

  const messagesRef = firestore.collection(!collection_name ? "default" : collection_name);
  // console.log(messagesRef);

  const query = messagesRef.orderBy("timestamp").limit(50);
  // console.log(query);

  const [messages] = useCollectionData(query, { idField: "id" });

  console.log(userType);

  console.log(messages);

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

  return (
    <div className='chat-container'>
      <Launcher
        agentProfile={{
          teamName: `Chat with ${name}`,
          imageUrl: "",
        }}
        onMessageWasSent={(msg) => {
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
