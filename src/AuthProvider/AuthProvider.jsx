import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { auth } from '../Firebase/Firebase.config';

const AuthProvider = ({ children }) => {


    const provider= new GoogleAuthProvider;


    const googleLogin=()=>{
        return signInWithPopup(auth,provider)
    }



    const authInformation={
        googleLogin
    }

    return <AuthContext value={authInformation}>{children}</AuthContext>
};

export default AuthProvider;