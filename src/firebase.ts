//Firebaseとの連携に必要な接続情報をまとめたファイルになります。
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA6a7j_2Spy6hgP0L9NTZAUvUbJitp2I8c",
  authDomain: "fir-todo-ece11.firebaseapp.com",
  projectId: "fir-todo-ece11",
  storageBucket: "fir-todo-ece11.appspot.com",
  messagingSenderId: "491542201831",
  appId: "1:491542201831:web:9f2a967546f298da1be942"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);