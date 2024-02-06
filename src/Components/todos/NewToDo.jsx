import axios from "axios";
import { useState } from "react";

export default function NewToDoForm({ onAddToDo, user }) {
  const [newToDo, setNewToDo] = useState({
    todo: "",
    completed: false,
  });

  function handleChange(evt) {
    setNewToDo({
      ...newToDo,
      todo: evt.target.value,
      completed: false,
    });
  }

  async function handleAddToDo(e) {
    e.preventDefault()
    try {
        await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/todos/add`,
            newToDo,
            {
                headers: {
                "user-email": user.email,
                "Content-Type": "application/json",
                },
            }
        )
        setNewToDo({
            todo: "",
            completed: false,
          });
        onAddToDo();
    } catch (e) {
        console.error(e)
    }
  }

  return (
    <>
      <h2>New To-Do</h2>
      <form onSubmit={handleAddToDo}>
        <input
          value={newToDo.todo}
          onChange={handleChange}
          placeholder="New To-Do"
          required
          pattern=".{3,}"
        />
        <button type="submit">ADD</button>
      </form>
    </>
  );
}
