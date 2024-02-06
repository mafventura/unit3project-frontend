import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import AuthPage from "./Components/AuthPage";
import Quicks from "./Components/Quicks";
import ToDoList from "./Components/todos/ToDoList";
import Schedule from "./Components/Schedule";

import Sidebar from "./Components/Sidebar";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [quicksModal, setQuicksModal] = useState(false);
  const [todoModal, setTodoModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [todos, setTodos] = useState([
    {
      todo: '',
      completed: false
    }
  ]);

  function handleShowModal(modalType) {
    modalType(true);
  }

  function handleCloseModal(modalType) {
    modalType(false);
  }

  const handleLogout = async () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, "_self");
  };

  async function getUser() {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });

      setUser(data?.user?._json);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchData() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todos`, {
        headers: {
          'user-email': user.email,
          "Content-Type": "application/json",
        }
      })
      const result = await response.json()  
      setTodos(result)     
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      {user ? (
        <div className="d-flex">
          <Sidebar handleLogout={handleLogout} user={user} />
          <Container className="d-flex flex-column justify-content-center align-items-center">
            <img
              src="https://i.imgur.com/NgLwrCz.png"
              alt="journey app logo"
              className="mb-5"
            />
            <Container className="d-flex justify-content-center">
              <Button
                variant="success"
                className="m-3"
                onClick={() => handleShowModal(setQuicksModal)}
              >
                Add Daily Check
              </Button>
              <Button
                variant="success"
                className="m-3"
                onClick={() => handleShowModal(setScheduleModal)}
              >
                Add Schedule
              </Button>
              <Button
                variant="success"
                className="m-3"
                onClick={() => {
                  handleShowModal(setTodoModal)
                  fetchData()
                }}
              >
                Add To-Do
              </Button>
            </Container>

            <Container>
              <h5>Today's Entries</h5>
            </Container>
          </Container>
        </div>
      ) : (
        <AuthPage
          user={user}
          setUser={setUser}
          handleClose={handleLogout}
          getUSer={getUser}
        />
      )}

      <Quicks
        showModal={quicksModal}
        handleClose={() => handleCloseModal(setQuicksModal)}
      />
      <ToDoList
        showModal={todoModal}
        handleClose={() => handleCloseModal(setTodoModal)}
        user={user}
        todos={todos}
        setTodos={setTodos}
        fetchData={fetchData}
      />
      <Schedule
        showModal={scheduleModal}
        handleClose={() => handleCloseModal(setScheduleModal)}
      />
    </div>
  );
}

export default App;
