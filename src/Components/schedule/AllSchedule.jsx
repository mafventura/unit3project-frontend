import { Container, Accordion, Form, InputGroup, Button } from "react-bootstrap";
import { useSchedule } from "../../context/ScheduleContext";

export default function AllSchedule({ dates, year, month }) {
    const { deleteSchedule } = useSchedule()
    return (
        <>
            <Accordion>
                {Object.entries(dates).map(([date, schedule]) => (
                    <Accordion.Item key={date} eventKey={year + "-" + month + "-" + date}>
                        <Accordion.Header>{date}</Accordion.Header>
                        <Accordion.Body>
                            {schedule.map((element, idx) => (
                                <>
                                    <Container key={idx} className="d-flex justify-content-between">
                                        <InputGroup.Text>
                                            {element.time[0]} - {element.time[1]}
                                        </InputGroup.Text>
                                        <Form.Control
                                            aria-label="Text input with checkbox"
                                            value={element.event}
                                            style={{ pointerEvents: "none" }}
                                            readOnly
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => deleteSchedule(element._id, idx)}
                                        >
                                            x
                                        </Button>
                                    </Container>
                                </>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    );
}
