// import { Container, Accordion, InputGroup, Form } from "react-bootstrap";
// import { useEffect } from "react";
// import { useToDos } from "../../context/ToDosContext";

// export default function AllToDos({ todos, fetchData }) {
//     const { handleCheckboxChange, handleInputChange,} = useToDos()
// //   fetchData()
//   const sortedTodos = todos.sort((a, b) => {
//     return new Date(b.date) - new Date(a.date);
//   });

//   const groupedTodos = sortedTodos.reduce((acc, todo) => {
//     const date = todo.date?.split("T")[0];
//     if (!todo.date) {
//                 console.warn('Todo with missing createdAt:', todo);
//               }
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(todo);
//     return acc;
//   }, {});

//   useEffect(() => {
//     fetchData()
//   }, [])

//   return (
//     <div className="d-flex" style={{width:'100%'}}>
//       <Container className="d-flex flex-column">
//         <Accordion className="mt-5">
//           {Object.entries(groupedTodos).map(([date, todos]) => (
//             <Accordion.Item eventKey={date} style={{width: '50%'}}>
//               <div key={date}>
//                 <Accordion.Header>{date}</Accordion.Header>
//                 {todos.map((todo, idx) => (
//                   <Accordion.Body key={idx} className="py-2">
//                     <InputGroup >
//                       <InputGroup.Checkbox
//                         aria-label="Checkbox for following text input"
//                         checked={todo.completed}
//                         onChange={() => handleCheckboxChange(idx)}
//                       />
//                       <Form.Control
//                         aria-label="Text input with checkbox"
//                         value={todo.todo}
//                         onChange={(e) => handleInputChange(idx, e.target.value)}
//                       />
//                     </InputGroup>
//                     {/* <h1>{todo.todo}</h1> */}
//                   </Accordion.Body>
//                 ))}
//               </div>
//             </Accordion.Item>
//           ))}
//         </Accordion>
//       </Container>
//     </div>
//   );
// }

import { Container, Accordion, InputGroup, Form } from "react-bootstrap";
import { useEffect } from "react";
import { useToDos } from "../../context/ToDosContext";
import AllTodosInDays from "./AllTodosInDays";

export default function AllToDos() {
  const {
    groupedTodos,
    setGroupedTodos,
    groupTodosByYear,
    sortMonthsAndDays,
    todos,
    fetchData
  } = useToDos();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const groupedByYear = groupTodosByYear(todos);
    const sortedYears = sortMonthsAndDays(groupedByYear);
    setGroupedTodos(sortedYears);
  }, [todos]);

  return (
    <div className="d-flex" style={{ width: "100%" }}>
      <Container className="d-flex flex-column">
          {Object.entries(groupedTodos).map(([year, months]) => (
        <Accordion className="mt-5" alwaysOpen>
            <Accordion.Item key={year} eventKey={year} style={{ width: "50%" }} >
              <div> 
                <Accordion.Header>{year}</Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    {Object.entries(months).map(([month, days]) => (
                      <Accordion.Item key={month} eventKey={year + "-" + month}>
                        <div>
                          <Accordion.Header>{month}</Accordion.Header>
                          <Accordion.Body>
                            <AllTodosInDays month={month} year={year} days={days} />
                          </Accordion.Body>
                        </div>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Accordion.Body>
              </div>
            </Accordion.Item>
        </Accordion>
          ))}
      </Container>
    </div>
  );
}

