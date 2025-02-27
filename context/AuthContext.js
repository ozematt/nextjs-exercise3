"use client";
import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDataObj, setUserDataObj] = useState(null);
  const [loading, setLoading] = useState(true);

  // AUTH HANDLERS
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password); // <-----sign up with firebase
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password); // <------- login with firebase
  }

  function logout() {
    setUserDataObj(null);
    setCurrentUser(null);
    return signOut(auth); // <------ sign out with fire base
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // <------- listening if authentication stat if changing, from firebase
      try {
        // Set the user to our local context state
        setLoading(true);
        setCurrentUser(user);
        if (!user) {
          console.log("No User Found");
          return;
        }

        // if user exists, fetch data from fire store database
        console.log("Fetching User Data");
        const docRef = doc(db, "users", user.uid); // <--- fetch data from fire base, with user id we have if user is authenticate
        const docSnap = await getDoc(docRef); // <----- collect information of user
        let firebaseData = {};
        if (docSnap.exists()) {
          // <------  if firebase data exist
          console.log("Found User Data");
          firebaseData = docSnap.data(); // <------ assign data from firebase to variable
        }
        setUserDataObj(firebaseData);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe; // cleanup out app when is not nesesery
  }, []);

  const value = {
    currentUser,
    userDataObj,
    setUserDataObj,
    signup,
    logout,
    login,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
