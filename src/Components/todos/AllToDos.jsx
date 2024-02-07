import React from "react";
import { Container } from "react-bootstrap";

export default function AllToDos({ todos, fetchData }) {
  // Sort the todos by createdAt date
  const sortedTodos = todos.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Group todos by createdAt date
  const groupedTodos = sortedTodos.reduce((acc, todo) => {
    const date = todo.createdAt.split('T')[0]; // Extract date part (YYYY-MM-DD)
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(todo);
    return acc;
  }, {});

  return (
    <div className="d-flex">
      <Container className="d-flex flex-column justify-content-center align-items-center">
        {/* Iterate over the groupedTodos object */}
        {Object.entries(groupedTodos).map(([date, todos]) => (
          <div key={date}>
            <h2>{date}</h2>
            {/* Iterate over todos for each date */}
            {todos.map((todo, idx) => (
              <div key={idx}>
                <h1>{todo.todo}</h1>
              </div>
            ))}
          </div>
        ))}
      </Container>
    </div>
  );
}
