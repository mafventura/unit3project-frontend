import { Container, Accordion } from "react-bootstrap";
import { useDailies } from "../../context/DailiesContext";

export default function AllDailiesInDays({ dates, year, month }) {
  const { handleQuoteChange } = useDailies();
  return (
    <>
      <Accordion>
        {Object.entries(dates).map(([date, quicks]) => (
          <Accordion.Item key={date} eventKey={year + "-" + month + "-" + date}>
            <Accordion.Header>{date}</Accordion.Header>
            <Accordion.Body>
              {quicks.map((quick, idx) => (
                <>
                  <Container key={idx} className="d-flex justify-content-between">
                    <p className="p-2 mb-1">
                      <strong>Water:</strong>{" "}
                      {quick.water === "0.5" ? (
                        <>💧(0.5 litre)</>
                      ) : quick.water === "1" ? (
                        <>💧 💧(1 litre)</>
                      ) : quick.water === "1.5" ? (
                        <>💧 💧 💧(1.5 litre)</>
                      ) : quick.water === "2" ? (
                        <>💧 💧 💧 💧(2 litre)</>
                      ) : null}
                    </p>
                    <p className="p-2 mb-1">
                      <strong>Mood:</strong> {quick.mood}
                    </p>
                    <p className="p-2 mb-1">
                      <strong>Sleep:</strong>{" "}
                      {quick.sleep === "0-4" ? (
                        <>🌙 (0 to 4 hours)</>
                      ) : quick.sleep === "4-6" ? (
                        <>🌙 🌙 (4 to 6 hours)</>
                      ) : quick.sleep === "6-8" ? (
                        <>🌙 🌙 🌙 (6 to 8 hours)</>
                      ) : quick.sleep === "8+" ? (
                        <>🌙 🌙 🌙 🌙 (8+ hours)</>
                      ) : null}
                    </p>
                  </Container>
                  <Container
                    style={{
                      background: "rgb(61, 125, 85, 0.05",
                      borderRadius: "10px",
                      borderBottom: "1px solid green",
                    }}
                  >
                    <p className="p-2 mb-0 d-flex justify-content-center">
                      <strong>{quick.quote}</strong>
                    </p>
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
