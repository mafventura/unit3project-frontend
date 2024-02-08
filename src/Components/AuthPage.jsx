import { useCallback } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useUser } from '../context/UserContext'

export default function AuthPage({ user, setUser, handleLogout, getUSer }) {
    const { googleAuth } = useUser()


    return (
    <div
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
    >
        <Container className="d-flex flex-column align-items-center">
            <img src="https://i.imgur.com/xlUSgOl.png" alt="journee-logo" style={{ width: "500px" }} />
            <Button variant="success" style={{ width: "200px" }} onClick={googleAuth}>
                Login
            </Button>
        </Container>
    </div>
    );
}
