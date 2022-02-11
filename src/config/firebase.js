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
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

// Create react redux firebase config
const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
  };

// Create firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBLHfPLCD6igKa7Cj2vp-ig08uDmL7TT_Q",
    authDomain: "react-auth-140d6.firebaseapp.com",
    projectId: "react-auth-140d6",
    storageBucket: "react-auth-140d6.appspot.com",
    messagingSenderId: "943154682",
    appId: "1:943154682:web:bb07579bad859ba2d93043",
    storageBucket: "gs://react-auth-140d6.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const usersRef = collection(db, "users");
const recipesRef = collection(db, "recipes");
const storage = getStorage(app);

// Save auth in session storage
const saveAuthToken = (res) => {
    sessionStorage.setItem('Auth Token', res._tokenResponse.refreshToken);
}

// Google login
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(usersRef, where("uid", "==", user.uid));
        const docs = await getDocs(q);

        saveAuthToken(res);
        
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
        saveAuthToken(res);
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
        await addDoc(usersRef, {
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

// Add recipe to database 
const addRecipeToDB = async (recipe) => {
    try {
        await addDoc(recipesRef, {
            uid: recipe.uid,
            name: recipe.name,
            desc: recipe.desc, 
            img: recipe.img, 
            ratings: recipe.ratings, 
            servings: recipe.servings, 
            cookTime: recipe.cookTime, 
            prepTime: recipe.prepTime, 
            ingredients: recipe.ingredients, 
            instructions: recipe.instructions, 
            notes: recipe.notes,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

// Return array of the current users recipes
const getUserRecipes = async (uid) => {
    const q = query(recipesRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let recipes = [];

    querySnapshot.forEach((doc) => {
        let recipe = doc.data();    
        recipes.push(
            {          
                uid: recipe.uid,
                name: recipe.name,
                desc: recipe.desc, 
                img: recipe.img, 
                ratings: recipe.ratings, 
                servings: recipe.servings, 
                cookTime: recipe.cookTime, 
                prepTime: recipe.prepTime, 
                ingredients: recipe.ingredients, 
                instructions: recipe.instructions, 
                notes: recipe.notes,
            }
        )
    });

    return recipes;
}

// Upload file to firebase storage bucket
const uploadFile = (file, set) => {
    if (!file) return; // Check if file exists
        const storageRef = ref(storage, `/images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }, 
        (err) => console.error(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then(url => set(url));
        }
    )
}

// Exports
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    addRecipeToDB,
    getUserRecipes,
    uploadFile
};