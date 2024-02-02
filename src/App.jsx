import { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import AuthPage from "./Components/AuthPage";


function App() {
  const [user, setUser] = useState('evy')

  return (
    <div>
      <AuthPage user={user} />
    </div>
  );
}

export default App;
