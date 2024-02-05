// import { GoogleLogin } from '@react-oauth/google'
import axios from "axios"
import { useState, useEffect, useCallback } from 'react'

export default function AuthPage() {
    const [user, setUser] = useState(null)

    const googleAuth = useCallback(() => {
        window.open(
            `${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`,
            '_self'
        )
    }, [])

    const handleLogout = async () => {
        window.open(
            `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
            '_self'
        )
    }

    async function getUser() {
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login/success`
            const { data } = await axios.get(url, { withCredentials: true})
            
            setUser(data?.user?._json)
        } catch (e) {
            console.error(e)
        }
    
    }

    useEffect(() => {
        getUser()
    }, [])

    return(
        <div>
            {!user ? <button onClick={googleAuth} >Login with google</button> :
            <button onClick={handleLogout} >logout</button>}
        </div>
    )
}
