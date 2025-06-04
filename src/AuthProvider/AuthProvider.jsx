import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { auth } from '../Firebase/Firebase.config';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const provider = new GoogleAuthProvider;

    // login with google
    const googleLogin = () => {
        return signInWithPopup(auth, provider)
    }

    // log out
    const signout = () => {
        return signOut(auth)
    }

    // create user with email and password

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update user
    const updateUser = (name, url) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: url });
    }

    // login user
    const userLogIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }




    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe()
        };
    }, []);



    const authInformation = {
        googleLogin,
        setUser,
        signout,
        registerUser,
        updateUser,
        userLogIn,
        user,
        isLoading,
    }

    return <AuthContext value={authInformation}>{children}</AuthContext>
};

export default AuthProvider;