import React, { useState, useEffect } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import NewToDoForm from "./NewToDo";
import ToDoListItem from "./ToDoListItem";

const ToDoList = ({ showModal, handleClose, user, todos, setTodos, fetchData }) => {
  function addToDo(todo) {
    setTodos([...todos, todo]);
  }

  function completedTodo(index) {
    const updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTodos[index],
      completed: !updatedTodos[index].completed,
    };
    setTodos(updatedTodos);
  }

  function deleteCompletedTodo(index) {
    console.log(index);
    const updatedTodos =  todos.filter((todo, idx) => index !== idx);
    setTodos(updatedTodos);
  }


  const toDoListItems = todos.map((t, idx) => {
    if (t.todo !== '') {
    return (
    <ToDoListItem
      todo={t.todo}
      key={t.todo}
      index={idx}
      todoCompleted={t.completed}
      completedTodoFunc={completedTodo}
      deleteCompletedTodo={deleteCompletedTodo}
    />
    )
  }
});

// async function deleteTodo() {
//   try {
//     await fetch(`${process.env.REACT_APP_BACKEND_URL}/todos`, {
//     method: 'DELETE'
//   })
//   } catch (e) {
//     console.error(e)
//   }

// }

useEffect(() => {
  fetchData(); 
}, [fetchData]);


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>To-Do</Modal.Title>
      </Modal.Header>

      <Modal.Body>
           {toDoListItems}
        <NewToDoForm addToDo={addToDo} todo={todos} user={user} />
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

// import React, { useState } from 'react';
// import { Modal, Button, InputGroup, Form } from 'react-bootstrap';

// const ToDoList = ({ showModal, handleClose }) => {
//   const [todos, setTodos] = useState(['']);

//   function addTodo() {
//     setTodos([...todos, '']);
//   }

//   function handleTodoChange(index, value) {
//     const updatedTodos = [...todos];
//     updatedTodos[index] = value;
//     setTodos(updatedTodos);
//   }

//   function handleDelete() {

//   }

//   return (
//     <Modal show={showModal} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>To-Do</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {todos.map((todo, index) => (
//           <InputGroup className="mb-1" key={index}>
//             <InputGroup.Checkbox aria-label="Checkbox for following text input" />
//             <Form.Control
//               aria-label="Text input with checkbox"
//               value={todo}
//               onChange={(e) => handleTodoChange(index, e.target.value)}
//             />
//             <Button variant='outline-secondary' size='sm'>&#x270E;</Button>
//             <Button variant='outline-secondary' size='sm'>x</Button>
//           </InputGroup>
//         ))}
//         <Button variant='outline-secondary' size='sm' className="mt-2" onClick={addTodo}>
//           Add
//         </Button>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ToDoList;


// import React, { useState } from 'react';
// import { Modal, Button, InputGroup, Form } from 'react-bootstrap';
// import axios from 'axios';

// const ToDoList = ({ showModal, handleClose, user }) => {
//   // console.log(user)
//   const [todos, setTodos] = useState([{ text: '', completed: false }]);

//   async function addTodo() {
//     setTodos([...todos, { text: '', completed: false }]);
    
//   }

//   async function saveTodos() {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}/todos/add`,
//         todos, // Send the entire todos array
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'user-email': user.email, // Assuming 'email' is the user identifier
//           },
//         }
//       );
  
//       if (response.status === 200) {
//         console.log('Todos saved successfully');
//       } else {
//         console.error('Error saving todos');
//       }
//     } catch (error) {
//       console.error('Error saving todos', error);
//     }
//   }
  

//   function handleTodoChange(index, value) {
//     const updatedTodos = [...todos];
//     updatedTodos[index].text = value;
//     setTodos(updatedTodos);
//   }

//   function handleCheckboxChange(index) {
//     const updatedTodos = [...todos];
//     updatedTodos[index].completed = !updatedTodos[index].completed;
//     setTodos(updatedTodos);
//   }

//   function handleDelete(index) {
//     const updatedTodos = [...todos];
//     updatedTodos.splice(index, 1);
//     setTodos(updatedTodos);
//   }



//   return (
//     <Modal show={showModal} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>To-Do</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {todos.map((todo, index) => (
//           <InputGroup className="mb-1" key={index}>
//             <InputGroup.Checkbox
//               aria-label="Checkbox for following text input"
//               checked={todo.completed}
//               onChange={() => handleCheckboxChange(index)}
//             />
//             <Form.Control
//               aria-label="Text input with checkbox"
//               value={todo.text}
//               onChange={(e) => handleTodoChange(index, e.target.value)}
//             />
//             {/* <Button variant='outline-secondary' size='sm'>&#x270E;</Button> */}
//             <Button variant='outline-secondary' size='sm' onClick={() => handleDelete(index)}>x</Button>
//           </InputGroup>
//         ))}
//         <Button variant='outline-secondary' size='sm' className="mt-2" onClick={addTodo}>
//           Add
//         </Button>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="outline-secondary" onClick={() => {
//           saveTodos()
//           handleClose()
//         }}>save</Button>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ToDoList;
