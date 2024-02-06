import { useCallback } from 'react'
import { Button } from 'react-bootstrap'

export default function AuthPage({ user, setUser, handleLogout, getUSer }) {

    const googleAuth = useCallback(() => {
        window.open(
            `${process.env.REACT_APP_BACKEND_URL}/auth/google/callback`,
            '_self'
        )
    }, [])

    return(
        <div style={{
            height: '100%',
            display: 'flex',
            background: 'rgb(233, 237, 200)',
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div className="btn-logo-wrapper" style= {{
                height : '60%',
                width: '30%',
                border: '1px solid black',
                display: 'flex',
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Button variant="outline-secondary" onClick={googleAuth} >Login with google</Button>
            </div> 
        </div>
    )
}
