import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZPtgqGrpAQNM64v-L_rzUBjDpwx2j2Cs",
  authDomain: "post-application-3730f.firebaseapp.com",
  projectId: "post-application-3730f",
  storageBucket: "post-application-3730f.appspot.com",
  messagingSenderId: "328002500955",
  appId: "1:328002500955:web:afe172d3d1761488c4027e",
  measurementId: "G-6Z18XMPSJQ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
