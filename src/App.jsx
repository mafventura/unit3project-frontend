import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import AuthPage from "./Components/AuthPage"
import Quicks from "./Components/Quicks"
import { Button } from "react-bootstrap"

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
      <h1>Hey There</h1>
      <AuthPage user={user} />
      <Sidebar />
      <Button variant="primary" onClick={handleShow}>
        Open Modal
      </Button>   

        <Quicks showModal={showModal} handleClose={handleClose} />
    </div>
  );


};

export default App;
