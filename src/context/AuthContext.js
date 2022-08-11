import React, { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscriber = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscriber
    }, [])

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    const value = {
        currentUser,
        signup
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}