import { Container, InputGroup, Form } from "react-bootstrap";
import { useSchedule } from "../../context/ScheduleContext";
import { useEffect } from "react";

export default function DisplaySchedule({ setSchedule }) {
    const { schedule, getSchedule } = useSchedule();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
        const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
        return `${day}/${month}/${year}`;
    };

    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Filter elements with today's date
    const scheduleToday = schedule.filter((element) => {
        const elementDate = new Date(element.date);
        return (
            elementDate.getDate() === todayDate.getDate() &&
            elementDate.getMonth() === todayDate.getMonth() &&
            elementDate.getFullYear() === todayDate.getFullYear()
        );
    });

    useEffect(() => {
        getSchedule();
    }, []);

    return (
        <div style={{ maxWidth: "50%" }}>
            {scheduleToday.map((element, index) => (
                <Container key={index} className="d-flex">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            {element.time[0]} - {element.time[1]}
                        </InputGroup.Text>
                        <Form.Control
                            aria-label="Text input with checkbox"
                            value={element.event}
                        />
                    </InputGroup>
                </Container>
            ))}
        </div>
    );
}
