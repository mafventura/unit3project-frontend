export default function ToDoListItem({
  todo,
  index,
  todoCompleted,
  completedTodoFunc,
  deleteCompletedTodo,
}) {

  function handleClick(e) {
    console.log(todoCompleted);
    if (!todoCompleted) {
      completedTodoFunc(index);
    } else {
      deleteCompletedTodo(index)
    };
  }


  return (
    <li
      className="ToDoListItem"
    >
      {/* <div className="flex-ctr-ctr">{index + 1}</div> */}
      <span className={todoCompleted ? "completedTodo" : ""}>{todo}</span>
      <button value={todoCompleted} onClick={handleClick}>
        {todoCompleted ? "❌" : "✔️"}
      </button>
 
    </li>
  );
}
