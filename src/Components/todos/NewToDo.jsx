import { useState } from "react";

export default function NewToDoForm({ addToDo, user }) {
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
    e.preventDefault();
    addToDo(newToDo);
    console.log(newToDo, `${process.env.REACT_APP_BACKEND_URL}/todos/add`);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/todos/add`,
        {
          method: "POST",
          headers: {
            "user-email": user.email,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newToDo),
        }
      );
      console.log(response);
      setNewToDo({
        todo: "",
        completed: false,
      });
    } catch (e) {
      console.error(e);
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
