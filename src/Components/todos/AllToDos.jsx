import { Container, Accordion, InputGroup, Form } from "react-bootstrap";
import { useEffect } from "react";

export default function AllToDos({ todos, fetchData }) {
//   fetchData()
  const sortedTodos = todos.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const groupedTodos = sortedTodos.reduce((acc, todo) => {
    const date = todo.createdAt?.split("T")[0];
    if (!todo.createdAt) {
                console.warn('Todo with missing createdAt:', todo);
              }
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(todo);
    return acc;
  }, {});

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="d-flex" style={{width:'100%'}}>
      <Container className="d-flex flex-column">
        <Accordion className="mt-5">
          {Object.entries(groupedTodos).map(([date, todos]) => (
            <Accordion.Item eventKey={date} style={{width: '50%'}}>
              <div key={date}>
                <Accordion.Header>{date}</Accordion.Header>
                {todos.map((todo, idx) => (
                  <Accordion.Body key={idx} className="py-2">
                    <InputGroup >
                      <InputGroup.Checkbox
                        aria-label="Checkbox for following text input"
                        checked={todo.completed}
                      />
                      <Form.Control
                        aria-label="Text input with checkbox"
                        value={todo.todo}
                      />
                    </InputGroup>
                    {/* <h1>{todo.todo}</h1> */}
                  </Accordion.Body>
                ))}
              </div>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}



// import React from "react";
// import { Container } from "react-bootstrap";

// export default function AllToDos({ todos, fetchData }) {
//   // Sort the todos by createdAt date
//   console.log(todos)
//   const sortedTodos = todos.sort((a, b) => {
//     return new Date(b.createdAt) - new Date(a.createdAt);
//   });

//   // Group todos by createdAt date
//   const groupedTodos = sortedTodos.reduce((acc, todo) => {
//     const date = todo.createdAt ? todo.createdAt.split('T')[0] : 'Unknown';
//     if (!todo.createdAt) {
//         console.warn('Todo with missing createdAt:', todo);
//       }
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(todo);
//     return acc;
//   }, {});

//   return (
//     <div className="d-flex">
//       <Container className="d-flex flex-column justify-content-center align-items-center">
//         {/* Iterate over the groupedTodos object */}
//         {Object.entries(groupedTodos).map(([date, todos]) => (
//           <div key={date}>
//             <h2>{date}</h2>
//             {/* Iterate over todos for each date */}
//             {todos.map((todo, idx) => (
//               <div key={idx}>
//                 <h1>{todo.todo}</h1>
//               </div>
//             ))}
//           </div>
//         ))}
//       </Container>
//     </div>
//   );
// }