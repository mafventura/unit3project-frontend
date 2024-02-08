import React from "react";
import { Container, Button } from "react-bootstrap";
import { BsDroplet } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function DisplayDaily({ fetchQuicksData, quicks }) {
  // console.log("these are the quicks", quicks);

  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const objectsFromToday = quicks.filter((quick) => {
    const createdAtDate = new Date(quick.createdAt);
    const createdAtDateOnly = new Date(
      createdAtDate.getFullYear(),
      createdAtDate.getMonth(),
      createdAtDate.getDate()
    );
    return createdAtDateOnly.getTime() === todayDate.getTime();
  });

  // console.log(objectsFromToday);
  return (
    <div>
      <h6>Daily Checks</h6>
      {objectsFromToday.length === 0 ? (
        <p>No daily checks created today.</p>
      ) : (
        <>
          {objectsFromToday.map((dailyCheck, index) => (
            <Container key={index} className="d-flex">
              <p className="p-2">
                <strong>Water:</strong>{" "}
                {dailyCheck.water === 0.5 ? (
                  <>
                    <BsDroplet />
                  </>
                ) : dailyCheck.water === 1 ? (
                  <>
                    <BsDroplet />
                    <BsDroplet />
                  </>
                ) : dailyCheck.water === 1.5 ? (
                  <>
                    <BsDroplet />
                    <BsDroplet />
                    <BsDroplet />
                  </>
                ) : dailyCheck.water === 2 ? (
                  <>
                    <BsDroplet />
                    <BsDroplet />
                    <BsDroplet />
                    <BsDroplet />
                  </>
                ) : null}
              </p>
              <p className="p-2">Mood: {dailyCheck.mood}</p>
              <p className="p-2">
                Sleep:{" "}
                {dailyCheck.sleep === 1 ? (
                  <>
                    <FaRegMoon />
                  </>
                ) : dailyCheck.sleep === 2 ? (
                  <>
                    <FaRegMoon />
                    <FaRegMoon />
                  </>
                ) : dailyCheck.sleep === 3 ? (
                  <>
                    <FaRegMoon />
                    <FaRegMoon />
                    <FaRegMoon />
                  </>
                ) : dailyCheck.sleep === 4 ? (
                  <>
                    <FaRegMoon />
                    <FaRegMoon />
                    <FaRegMoon />
                    <FaRegMoon />
                  </>
                ) : null}
              </p>
              <p className="p-2">Quote: {dailyCheck.quote}</p>

              <Button
                size="sm"
                variant="outline-success"
                style={{
                  padding: "0.2px",
                  height: "25px",
                  width: "25px",
                  fontSize: "0.75rem",
                  marginTop: "8px",
                }}
              >
                <CiEdit />
              </Button>

              <Button
                size="sm"
                variant="outline-success"
                style={{
                  padding: "0.2px",
                  height: "25px",
                  width: "25px",
                  fontSize: "0.75rem",
                  marginTop: "8px",
                  marginLeft: '5px'
                }}
              >
                <MdDeleteOutline />
              </Button>

            </Container>
          ))}
        </>
      )}
    </div>
  );
}
