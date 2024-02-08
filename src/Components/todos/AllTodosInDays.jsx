import { Container, Accordion, InputGroup, Form } from "react-bootstrap";
import { useEffect } from "react";
import { useToDos } from "../../context/ToDosContext";

export default function AllTodosInDays({ year, month, days }) {
  const {
    handleCheckboxChange,
    handleInputChange,
    groupedTodos,
    setGroupedTodos,
    groupTodosByYear,
    sortMonthsAndDays,
    todos,
    fetchData,
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
    <>
      <Accordion>
        {Object.entries(days).map(([day, todos]) => (
          <Accordion.Item key={day} eventKey={year + "-" + month + "-" + day}>
            <div>
              <Accordion.Header>{day}</Accordion.Header>
              <Accordion.Body>
                {todos.map((todo, idx) => (
                  <InputGroup key={idx}>
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      checked={todo.completed}
                      onChange={() => handleCheckboxChange(todo._id)}
                    />
                    <Form.Control
                      aria-label="Text input with checkbox"
                      value={todo.todo}
                      onChange={(e) => handleInputChange(todo._id, e.target.value)}
                    />
                  </InputGroup>
                ))}
              </Accordion.Body>
            </div>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
