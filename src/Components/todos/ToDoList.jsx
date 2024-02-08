import React, { useState, useEffect } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import NewToDoForm from "./NewToDoForm";
import ToDoListItem from "./ToDoListItem";
import { useToDos } from "../../context/ToDosContext";

const ToDoList = ({
  showModal,
  handleClose,
  user,
  todos,
  setTodos,
  fetchData,
  deleteCompletedTodo,
}) => {


  const { completedTodo } = useToDos()

  const toDoListItems = todos.map((todo, idx) => {
    // console.log(todo);
    if (todo.todo !== "") {
      return (
        <ToDoListItem
          todo={todo}
          key={todo.todo}
          index={idx}
          todoCompleted={todo.completed}
          completedTodoFunc={completedTodo}
          deleteCompletedTodo={deleteCompletedTodo}
        />
      );
    }
  });

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>To-Do</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* {toDoListItems} */}
        <NewToDoForm fetchData={fetchData} todo={todos} user={user} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ToDoList;
