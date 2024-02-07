import React, { useState, useEffect } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import NewToDoForm from "./NewToDo";
import ToDoListItem from "./ToDoListItem";

const ToDoList = ({
  showModal,
  handleClose,
  user,
  todos,
  setTodos,
  fetchData,
  deleteCompletedTodo,
}) => {
  // function addToDo(todo) {
  //   setTodos([...todos, todo]);
  // }

  function completedTodo(index) {
    const updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTodos[index],
      completed: !updatedTodos[index].completed,
    };
    setTodos(updatedTodos);
  }

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

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>To-Do</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* {toDoListItems} */}
        <NewToDoForm onAddToDo={fetchData} todo={todos} user={user} />
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
