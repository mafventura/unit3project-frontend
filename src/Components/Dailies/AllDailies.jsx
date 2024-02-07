import React from "react";
import { Container } from "react-bootstrap";

export default function AllDailies({ quicks }) {
    const sortedDailies = quicks.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const groupedDailies = sortedDailies.reduce((acc, quick) => {
    const date = quick.createdAt.split("T")[0];
    if (!acc[date]) {
        acc[date] = [];
    }
    acc[date].push(quick);
    return acc;
    }, {});

    return (
    <div className="d-flex">
        <Container className="d-flex flex-column justify-content-center align-items-center">
        {Object.entries(groupedDailies).map(([date, quicks]) => (
            <div key={date}>
            <h2>{date}</h2>
            {quicks.map((quick, idx) => (
                <div key={idx}>
                <h1>{quick.water}</h1>
                </div>
            ))}
            </div>
        ))}
        </Container>
    </div>
    );
}
