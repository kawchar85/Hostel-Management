import {getStorage} from "firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2LYwrvtlaPXqJtYV-Vi36jinc7wKViGo",
  authDomain: "hostel-management-c2d74.firebaseapp.com",
  projectId: "hostel-management-c2d74",
  storageBucket: "hostel-management-c2d74.appspot.com",
  messagingSenderId: "492571215000",
  appId: "1:492571215000:web:2bd06383b0efeb51e1bced"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);