import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebaseApp from "../fireBase";

initializeFirebaseApp();

const useFirebase = () => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const auth = getAuth();

    function signup(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                console.log("error", error);
            });
    }


    function login(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                console.log(error);
            });
        // return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [auth])

    return {
        currentUser,
        loading,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
}

export default useFirebase;