import { Container, Accordion, InputGroup, Form, Button } from "react-bootstrap";
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
        {Object.entries(days).map(([day, dayTodos]) => {
          console.log(day,'<-------' )
          console.log(dayTodos)
          // Check if there are any incomplete todos for this day
          const incompleteTodos = dayTodos.some(todo => !todo.completed);

          return (
            <Accordion.Item key={day} eventKey={year + "-" + month + "-" + day}>
              <div>
                <Accordion.Header>
                  {day}{" "}
                  {incompleteTodos && (
                    <Button
                      className="small-button"
                      // style={{ marginLeft: '2vmin', borderRadius: '50%' }}
                      size="sm"
                    ></Button>
                  )}
                </Accordion.Header>
                <Accordion.Body>
                  {dayTodos.map((todo, idx) => (
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
          );
        })}
      </Accordion>
    </>
  );
}
