import { useContext, createContext, useState } from "react"
import axios from "axios"

const DiaryContext = createContext()

export function useDiaries() {
    return useContext(DiaryContext)
}

export function DiariesProvider({children}) {
    const [user, setUser] = useState(null)

    async function getUser() {
        try {
           const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/login`)
           setUser(response.data)
        } catch (e) {
            console.error("Error adding User", e)
        }
    }

    async function callback(response) {
        try {
            isLoggedIn.value = true

            const user = decodeCredential(response.credential)
            userName = user.given_name
            cookies.set('user_session', response.credential)
            await axios.post(`${import.meta.env.VITE_API_URL}/users/add`)
            console.log('session saved');
            
        } catch (error) {
            console.error('Error saving session:', error)
        }
    }

    function checkSession() {
        if (cookies.isKey('user_session')) {
            isLoggedIn.value = true
            const user = decodeCredential(cookies.get('user_session'))
            userName = user.given_name
        }
    }

    function handleLogout() {
        googleLogout()
        cookies.remove('user_session')
        isLoggedIn.value = false
        window.location.reload()
    }


    return (
        <DiaryContext.Provider value={{
            user,
            getUser
        }}>
            {children}
        </DiaryContext.Provider>
    )
}