//@ts-check

import firebase from "./firebase";

export const verify = async (setCuruser, setPhone) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCuruser(user.uid);
      setPhone(user.phoneNumber);
    } else {
      setCuruser("No user found");
      window.location = "/init-signin";
    }
  });
};
