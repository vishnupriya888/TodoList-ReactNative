import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyAXsxMBhNm2NZYC4EdVrKZvCpbwZl-K_1c",
  authDomain: "todolist-25105.firebaseapp.com",
  projectId: "todolist-25105",
  storageBucket: "todolist-25105.appspot.com",
  messagingSenderId: "955729691947",
  appId: "1:955729691947:web:dd7ff8ea2ff103c24a316e",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
