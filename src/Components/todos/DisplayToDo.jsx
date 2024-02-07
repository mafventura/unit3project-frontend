import {InputGroup, Form, Button} from "react-bootstrap";
import axios from "axios";

export default function DisplayToDo({ todos, setTodos, fetchData, deleteCompletedTodo }) {
    //   console.log(todos);
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const todosFromToday = todos.filter(todo => {
        // Convert createdAt string to Date todoect
            const createdAtDate = new Date(todo.createdAt);
            // Extract the date part from createdAt timestamp
            const createdAtDateOnly = new Date(createdAtDate.getFullYear(), createdAtDate.getMonth(), createdAtDate.getDate());
            // Check if createdAtDate is equal to today's date
            return createdAtDateOnly.getTime() === todayDate.getTime();
    });

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
      {todosFromToday.map((todo, index) => (
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
