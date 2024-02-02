import { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import AuthPage from "./Components/AuthPage";

import Sidebar from "./Components/Sidebar";
import './App.css'

function App() {
  const [user, setUser] = useState('evy')

  return (
    <div>
      <AuthPage  />
      <Sidebar />
    </div>
  );
}

export default App;
