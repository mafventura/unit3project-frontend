import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import AuthPage from "./Components/AuthPage";
import Quicks from "./Components/Quicks";
import ToDoList from "./Components/todos/ToDoList";
import Schedule from "./Components/Schedule";
import DisplayToDo from "./Components/todos/DisplayToDo";
import Sidebar from "./Components/Sidebar";
import "./App.css";

export default function Home({user, setUser, getUser}) {
    const [quicksModal, setQuicksModal] = useState(false);
    const [todoModal, setTodoModal] = useState(false);
    const [scheduleModal, setScheduleModal] = useState(false);
    const [todos, setTodos] = useState([
      {
        todo: "",
        completed: false,
      },
    ]);
  
    function handleShowModal(modalType) {
      modalType(true);
    }
  
    function handleCloseModal(modalType) {
      modalType(false);
    }

  

  
    function deleteCompletedTodo(index) {
      // console.log(index);
      const updatedTodos = todos.filter((todo, idx) => index !== idx);
      setTodos(updatedTodos);
    }
  
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
  
    // useEffect(() => {
    //   getUser();
    // }, []);
  
    useEffect(() => {
      if (user?.email) {
        // console.log("fet", user);
        fetchData();
      }
    }, [user]);
  
    return (
      <div
      //   style={{
      //     height: "100vh",
      //     width: "100vw",
      //   }}
      >
       <h1>Hello</h1>
          <div className="d-flex">
            <Container className="d-flex flex-column justify-content-center align-items-center">
              {/* <img
                src="https://i.imgur.com/NgLwrCz.png"
                alt="journey app logo"
                className="mb-5"
              /> */}
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
                    fetchData();
                    handleShowModal(setTodoModal);
                  }}
                >
                  Add To-Do
                </Button>
              </Container>
  
              <Container>
                <h5>Today's Entries</h5>
              </Container>
  
              <Container>
                <DisplayToDo
                  todos={todos}
                  setTodos={setTodos}
                  fetchData={fetchData}
                  deleteCompletedTodo={deleteCompletedTodo}
                />
              </Container>
            </Container>
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
          deleteCompletedTodo={deleteCompletedTodo}
        />
        <Schedule
          showModal={scheduleModal}
          handleClose={() => handleCloseModal(setScheduleModal)}
        />
          </div>

  

      </div>
    );
}
