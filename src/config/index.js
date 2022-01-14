import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCa4ILjYKgUseV8KHFx3FFm6QnnFHrp2aE",
    authDomain: "recipe-app-e7972.firebaseapp.com",
    projectId: "recipe-app-e7972",
    storageBucket: "recipe-app-e7972.appspot.com",
    messagingSenderId: "143668143572",
    appId: "1:143668143572:web:b75d085a94ebeb608be241",
    measurementId: "G-HWG1LPK6DT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}