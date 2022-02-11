import { configureStore } from '@reduxjs/toolkit'
import {actionTypes, firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

export const store = configureStore({
  reducer: {
    firebaseReducer,
    firestoreReducer,
  }
})