import { useContext, createContext, useState, useCallback } from "react"
import axios from "axios"

export const DiaryContext = createContext()

export function useDiaries() {
    return useContext(DiaryContext)
}

export function DiariesProvider({children}) {
    // const [user, setUser] = useState(null)

    // async function getUser() {
    //     try {
    //        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/login`)
    //        setUser(response.data)
    //     } catch (e) {
    //         console.error("Error adding User", e)
    //     }
    // }

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


    return (
        <DiaryContext.Provider value={{
            user,
            setUser,
            googleAuth,
            handleLogout,
            getUser,
        }}>
            {children}
        </DiaryContext.Provider>
    )
}