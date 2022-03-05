import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB_i49yoE0fTUHdAeI_BNMWShWQ8lNQKgA",
  authDomain: "keep-clone-add76.firebaseapp.com",
  projectId: "keep-clone-add76",
  storageBucket: "keep-clone-add76.appspot.com",
  messagingSenderId: "1241947614",
  appId: "1:1241947614:web:88b98f2eb144b4b119d14f"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();

  export {db};