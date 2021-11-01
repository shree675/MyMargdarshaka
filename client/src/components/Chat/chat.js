//@ts-check
import React, { Component } from "react";
import { Launcher } from "react-chat-window";

//import firebase from "firebase/compat/app"
//import "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore";

//import { firebaseApp } from '../../firebase';
//import { getFirestore, collection, getDocs } from '/firebase/firestore';
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

function Chat() {
  const firestore = firebase.firestore(firebase.app());

  //const messagesRef = firestore.collection("messages")
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("timestamp").limit(25);
  //const [messages] = useCollectionData(query, {idField: 'id'})
  //console.log("hello");
  //messagesRef.get().then(querySnapshot => {
  //if(querySnapshot.empty){
  //console.log("empty");
  //}else{
  //querySnapshot.forEach(documentSnapshot => {
  //console.log("hello : ", documentSnapshot.get("text") );
  //})
  //}
  //})

  const [messages] = useCollectionData(query, { idField: "id" });

  console.log(messages);

  const textMessages =
    messages === undefined
      ? []
      : messages.map((msg) => {
          console.log(msg);
          return { author: msg.author, type: "text", data: { text: msg.text } };
        });

  console.log(textMessages);

  //this.state = {
  //messageList: []
  //};

  //const _onMessageWasSent = (message) => {
  //setState({
  //messageList: [...this.state.messageList, message],
  //});
  //};

  const _sendMessage = (text) => {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      });
    }
  };

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: "react-chat-window",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={(msg) => {
          //console.log(text);
          messagesRef.add({
            author: "me",
            timestamp: new Date(),
            text: msg.data.text,
          });
        }}
        messageList={textMessages}
        showEmoji
      />
    </div>
  );
}

export default Chat;
