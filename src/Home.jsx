import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Quicks from "./Components/Dailies/Quicks";
import ToDoList from "./Components/todos/ToDoList";
import Schedule from "./Components/schedule/NewScheduleModal";
import DisplayToDo from "./Components/todos/DisplayToDo";
import DisplayDaily from "./Components/Dailies/DisplayDaily";
import "./App.css";
import { useToDos } from "./context/ToDosContext";

export default function Home({
  user,
  setUser,
  getUser,
  quicks,
  setQuicks,
  fetchQuicksData,
  selectedDaily,
  setSelectedDaily,
}) {
  const [quicksModal, setQuicksModal] = useState(false);
  const [todoModal, setTodoModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);

  const { deleteCompletedTodo, todos, setTodos, fetchData } = useToDos();

  function handleShowModal(modalType) {
    modalType(true);
  }

  function handleCloseModal(modalType) {
    modalType(false);
  }

  useEffect(() => {
    if (user?.email) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      fetchQuicksData();
    }
  }, [user]);

  return (
    <div>
      <div className="d-flex">
        <Container className="d-flex flex-column justify-content-center align-items-center">
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
            <DisplayDaily
              fetchQuicksData={fetchQuicksData}
              quicks={quicks}
              setQuicks={setQuicks}
              quicksModal={quicksModal}
              setQuicksModal={setQuicksModal}
              selectedDaily={selectedDaily}
              setSelectedDaily={setSelectedDaily}
              handleCloseModal={handleCloseModal}
              handleShowModal={handleShowModal}
            />
          </Container>
        </Container>
        <Quicks
          showModal={quicksModal}
          handleClose={() => handleCloseModal(setQuicksModal)}
          user={user}
          fetchQuicksData={fetchQuicksData}
          selectedDaily={selectedDaily}
          setSelectedDaily={selectedDaily}
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
