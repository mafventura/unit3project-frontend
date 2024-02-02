import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import axios from "axios"
import { useState } from 'react'


export default function AuthPage() {
    const [user, setUser] = useState('')

    async function googleResponse(response) {
        const userOb = jwtDecode(response.credential)
        console.log(userOb) 
        await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/users/add`, {
            email :  userOb.email,
            name: userOb.given_name
        }) 
        setUser(userOb.name)
        console.log(user)
    }

  return (
    <div>
        <GoogleLogin onSuccess={googleResponse} /> 
    </div>
  )
}
