import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    signInWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

// Create firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBLHfPLCD6igKa7Cj2vp-ig08uDmL7TT_Q",
    authDomain: "react-auth-140d6.firebaseapp.com",
    projectId: "react-auth-140d6",
    storageBucket: "react-auth-140d6.appspot.com",
    messagingSenderId: "943154682",
    appId: "1:943154682:web:bb07579bad859ba2d93043"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Save auth in session storage
const saveAuthToken = () => {
    sessionStorage.setItem('Auth Token', res._tokenResponse.refreshToken);
}

// Google login
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);

        saveAuthToken();
        
        if (docs.docs.length == 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

// Email and passowrd login
const logInWithEmailAndPassword = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        saveAuthToken();
    } catch (err) {
        console.error(err);
        alert(err.message);     
    }
}

// Register with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

// Send password reset email
const sendPasswordReset = async(email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

// Logout 
const logout = () => {
    signOut(auth);
};

// Exports
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};