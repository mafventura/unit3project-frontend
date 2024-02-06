import axios from "axios";

export default function ToDoListItem({
  todo,
  index,
  todoCompleted,
  completedTodoFunc,
  deleteCompletedTodo,
}) {

  async function deleteTodo() {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todos/${todo._id}`)
      deleteCompletedTodo(index)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <li className="ToDoListItem">
      <span className={todoCompleted ? "completedTodo" : ""}>{todo.todo}</span>
      <button
        value={todoCompleted}
        onClick={(e) => {
          console.log(todo);
          deleteTodo();
        }}
      >
        ❌
      </button>
    </li>
  );
}













  // function handleClick(e) {
  // console.log(todoCompleted);
  // if (!todoCompleted) {
  //   completedTodoFunc(index);
  // } else {
  // deleteCompletedTodo(index)
  // };
  // }