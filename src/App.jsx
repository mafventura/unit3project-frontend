import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import AuthPage from "./Components/AuthPage"
import Quicks from "./Components/Quicks"
import { Button, Container } from "react-bootstrap"

import Sidebar from "./Components/Sidebar"
import './App.css'

function App() {
  const [user, setUser] = useState('evy')

  
    const [showModal, setShowModal] = useState(false);
  
    const handleShow = () => {
      setShowModal(true);
    }
  
    const handleClose = () => {
      setShowModal(false)
    }

  return (
    <div>
      <AuthPage  />
      <div className="d-flex">
        <Sidebar />
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <img src="https://i.imgur.com/NgLwrCz.png" alt="journey app logo" className="mb-5"/>
          <Container className="d-flex justify-content-center">
            <Button variant="success" className="m-3" onClick={handleShow}>
              Add Daily Check
            </Button> 
            <Button variant="success" className="m-3">Add Schedule</Button>
            <Button variant="success" className="m-3">Add To-Do</Button>
          </Container>
          
          <Container>
            <h5>Today's Entries</h5>
          </Container>
        </Container>
      </div>

        <Quicks showModal={showModal} handleClose={handleClose} />
    </div>
  );


};

export default App;

