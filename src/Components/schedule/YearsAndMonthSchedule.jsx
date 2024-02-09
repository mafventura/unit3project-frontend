import { Container, Accordion } from "react-bootstrap";
import { useSchedule } from "../../context/ScheduleContext";
import { useEffect } from "react";
import AllSchedule from "./AllSchedule";

export default function YearsAndMonthSchedule() {
    const { schedule, getSchedule } = useSchedule();

    const sortedSchedule = schedule.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    const groupedSchedule = sortedSchedule.reduce((acc, element) => {
        const createdAtDate = new Date(element.date);
        const year = createdAtDate.getFullYear();
        // const month = createdAtDate.getMonth();
        const monthName = createdAtDate.toLocaleString("default", {
            month: "long",
        });

        if (!acc[year]) {
            acc[year] = {};
        }

        if (!acc[year][monthName]) {
            acc[year][monthName] = {};
        }

        const date = createdAtDate.getDate();

        if (!acc[year][monthName][date]) {
            acc[year][monthName][date] = [];
        }

        acc[year][monthName][date].push(element);
        return acc;
    }, {});

    useEffect(() => {
        getSchedule();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="d-flex flex-column align-items-center" style={{ width: "100%" }}>
            <h1 className="p-3 mt-3" style={{ color: "#3a7e54", fontSize: 40 }}>All Events</h1>
            <Container className="d-flex flex-column">
                <div className="mt-5" style={{ width: "100%" }}>
                    {Object.entries(groupedSchedule).map(([year, months]) => (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h4>
                                <strong>{year}</strong>
                            </h4>{" "}
                            <Accordion style={{ width: "100%" }}>
                                {Object.entries(months).map(([month, dates]) => (
                                    <Accordion.Item key={month} eventKey={year + "-" + month}>
                                        <Accordion.Header>{month}</Accordion.Header>
                                        <Accordion.Body>
                                            <AllSchedule
                                                dates={dates}
                                                year={year}
                                                month={month}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
