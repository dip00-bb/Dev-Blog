import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
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
        user,
        isLoading,
    }

    return <AuthContext value={authInformation}>{children}</AuthContext>
};

export default AuthProvider;