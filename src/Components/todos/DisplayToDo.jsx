import {InputGroup, Form, Button} from "react-bootstrap";
import axios from "axios";

export default function DisplayToDo({ todos, setTodos, fetchData, deleteCompletedTodo }) {
//   console.log(todos);
  function handleCheckboxChange(index) {
    const updatedTodos = todos.map((todo, idx) => {
      if (idx === index) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        updateTodoOnServer(updatedTodo);
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function handleInputChange(index, newValue) {
    const updatedTodos = todos.map((todo, idx) => {
      if (idx === index) {
        const updatedTodo = { ...todo, todo: newValue };
        updateTodoOnServer(updatedTodo);
        return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  async function updateTodoOnServer(updatedTodo) {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/todos/${updatedTodo._id}`,
        updatedTodo,
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await fetchData();
    } catch (e) {
      console.error(e);
    }
  }

    async function deleteTodo(todoId, index) {
        try {
          await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${todoId}`)
          deleteCompletedTodo(index)
        } catch (e) {
            console.error(e)
        }
    }

  return (
    <div
      style={{
        maxWidth: "50%",
      }}
    >
      {todos.map((todo, index) => (
        <InputGroup className="mb-3" key={index}>
          <InputGroup.Checkbox
            aria-label="Checkbox for following text input"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(index)}
          />
          <Form.Control
            aria-label="Text input with checkbox"
            value={todo.todo}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={() => deleteTodo(todo._id, index)}
          >
            x
          </Button>
        </InputGroup>
      ))}
    </div>
  );
}
