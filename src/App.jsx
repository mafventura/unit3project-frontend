import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import AuthPage from "./Components/AuthPage";
import Quicks from "./Components/Dailies/Quicks";
import ToDoList from "./Components/todos/ToDoList";
import Schedule from "./Components/schedule/NewScheduleModal";
import DisplayToDo from "./Components/todos/DisplayToDo";
import Sidebar from "./Components/Sidebar";
import AllToDos from "./Components/todos/AllToDos";
import "./App.css";
import Home from "./Home";

function App() {
  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });

      setUser(data?.user?._json);
    } catch (e) {
      console.error(e);
    }
  }

  const handleLogout = async () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, "_self");
  };

  useEffect(() => {
    getUser();
  }, []);

  const fetchData = useCallback(async () => {
    console.log("fetching");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todos`,
        {
          headers: {
            "user-email": user.email,
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.data;
      setTodos(result);
      console.log(result)
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  return (
    <>
      {user ? (
        <div className="d-flex">
          <Sidebar user={user} handleLogout={handleLogout} />
          <Routes>
            <Route path="/todos" element={<AllToDos fetchData={fetchData} />} />
            <Route
              path="/"
              element={<Home user={user} setUser={setUser} getUser={getUser} fetchData={fetchData} />}
            />
          </Routes>
        </div>
      ) : (
        <AuthPage
            user={user}
            setUser={setUser}
            handleClose={handleLogout}
            getUSer={getUser}
          />
      )}
    </>
  );
}

export default App;
