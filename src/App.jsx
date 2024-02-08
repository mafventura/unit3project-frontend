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
import YearsAndMonthToDos from "./Components/todos/YearsAndMonthToDos";
import "./App.css";
import Home from "./Home";
import AllDailies from "./Components/Dailies/AllDailies";
import { useUser } from "./context/UserContext";
import { useToDos } from "./context/ToDosContext";

function App() {
  const { todos, setTodos, fetchData } = useToDos();
  const { user, setUser, getUser, handleLogout } = useUser();
  const [selectedDaily, setSelectedDaily] = useState(null);

  const [quicks, setQuicks] = useState([
    {
      water: 0,
      mood: "",
      sleep: 0,
      quote: "",
    },
  ]);

  useEffect(() => {
    getUser();
  }, []);

  const fetchQuicksData = useCallback(async () => {
    try {
      // console.log("this is", user);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/dailies`,
        {
          headers: {
            "user-email": user.email,
            "Content-Type": "application/json",
          },
        }
      );
      const result = response.data;
      setQuicks(result);
      // console.log(quicks);
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
            <Route
              path="/todos"
              element={
                <YearsAndMonthToDos fetchData={fetchData} todos={todos} />
              }
            />
            <Route
              path="/dailies"
              element={
                <AllDailies fetchQuicksData={fetchQuicksData} quicks={quicks} />
              }
            />
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  setUser={setUser}
                  getUser={getUser}
                  quicks={quicks}
                  setQuicks={setQuicks}
                  fetchQuicksData={fetchQuicksData}
                  selectedDaily={selectedDaily}
                  setSelectedDaily={setSelectedDaily}
                />
              }
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
