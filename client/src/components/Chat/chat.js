//@ts-check

import React from "react";
import "./chat.css";
import { Launcher } from "react-chat-window";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "../../firebase";
import { Base64 } from "js-base64";
// library to encrypt messages
var aesjs = require("aes-js");

function Chat({ collection_name, userType, name }) {
  // obtaining the latest 50 messages from the database
  const firestore = firebase.firestore(firebase.app());
  const messagesRef = firestore.collection(!collection_name ? "default" : collection_name);
  const query = messagesRef.orderBy("timestamp").limit(50);
  const [messages] = useCollectionData(query, { idField: "id" });

  // key for encryption
  var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const textMessages =
    messages === undefined
      ? []
      : messages.map((msg) => {
          // decoding the messages
          var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(4));
          var encryptedBytes = aesjs.utils.hex.toBytes(msg.text);
          var decryptedBytes = aesCtr.decrypt(encryptedBytes);
          var decryptedMessage = aesjs.utils.utf8.fromBytes(decryptedBytes);
          var decodedStr = Base64.decode(decryptedMessage);
          return {
            author: msg.author === userType ? "me" : "them",
            type: "text",
            data: { text: decodedStr },
          };
        });

  // frontend component of the chat box
  return (
    <div className='chat-container'>
      <Launcher
        agentProfile={{
          teamName: `Chat with ${name}`,
          imageUrl: "",
        }}
        onMessageWasSent={(msg) => {
          // function to handle the sending of messages
          if (msg.type === "text") {
            // encoding the message to be sent
            var encodedStr = Base64.encode(msg.data.text);
            var messageBytes = aesjs.utils.utf8.toBytes(encodedStr);
            var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(4));
            var encryptedBytes = aesCtr.encrypt(messageBytes);
            var encryptedMessage = aesjs.utils.hex.fromBytes(encryptedBytes);
            messagesRef.add({
              author: userType,
              timestamp: new Date(),
              text: encryptedMessage,
            });
          } else if (msg.type === "emoji") {
            // encoding the message to be sent
            var encodedStr = Base64.encode(msg.data.emoji);
            var messageBytes = aesjs.utils.utf8.toBytes(encodedStr);
            var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(4));
            var encryptedBytes = aesCtr.encrypt(messageBytes);
            var encryptedMessage = aesjs.utils.hex.fromBytes(encryptedBytes);
            messagesRef.add({
              author: userType,
              timestamp: new Date(),
              text: encryptedMessage,
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
