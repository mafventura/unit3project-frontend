import React from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import EditDaily from "./EditDaily"
import { useState, useEffect } from "react";

export default function DisplayDaily({
  fetchQuicksData,
  quicks,
  setQuicks,
  quicksModal,
  setQuicksModal,
  showModal,
  handleClose,
  editModal,
  setEditModal,
  handleShowModal,
  user
}) {

  const [selectedDailyId, setSelectedDailyId] = useState(null);

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

  async function deleteDaily(selectedDailyId) {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/dailies/${selectedDailyId}`)
        .then(() => {
            setQuicks(quicks.filter(daily => daily._id !== selectedDailyId))
            fetchQuicksData()
        })
        .catch(error => console.error("Error deleting expense", error))
  }

  return (
    <div>
      <h6>Daily Checks</h6>
      {objectsFromToday.length === 0 ? (
        <p>No daily checks created today.</p>
      ) : (
        <>
          {objectsFromToday.map((dailyCheck, index) => (
            <Container key={dailyCheck._id} className="d-flex">
              <p className="p-2">
                <strong>Water:</strong>{" "}
                {dailyCheck.water === "0.5" ? (
                  <>
                    💧
                  </>
                ) : dailyCheck.water === "1" ? (
                  <>
                    💧
                    💧
                  </>
                ) : dailyCheck.water === "1.5" ? (
                  <>
                    💧
                    💧
                    💧
                  </>
                ) : dailyCheck.water === "2" ? (
                  <>
                    💧
                    💧
                    💧
                    💧
                  </>
                ) : null}
              </p>
              <p className="p-2">Mood: {dailyCheck.mood}</p>
              <p className="p-2">
                Sleep:{" "}
                {dailyCheck.sleep === "0-4" ? (
                  <>
                    🌙
                  </>
                ) : dailyCheck.sleep === "4-6" ? (
                  <>
                    🌙
                    🌙
                  </>
                ) : dailyCheck.sleep === "6-8" ? (
                  <>
                    🌙
                    🌙
                    🌙
                  </>
                ) : dailyCheck.sleep === "8+" ? (
                  <>
                    🌙
                    🌙
                    🌙
                    🌙
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
                onClick={() => {
                  handleShowModal(setEditModal)
                  setSelectedDailyId(dailyCheck._id)
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
                  marginLeft: "5px",
                }}
                onClick={() => deleteDaily(dailyCheck._id)}
              >
                <MdDeleteOutline />
              </Button>
            </Container>
          ))}
        </>
      )}

      <EditDaily
        showModal={editModal}
        handleClose={() => handleClose(setEditModal)}
        user={user}
        fetchQuicksData={fetchQuicksData}
        selectedDailyId={selectedDailyId}
        setSelectedDailyId={setSelectedDailyId}
        quicks={quicks}
        setQuicks={setQuicks}
      />
    </div>
  );
}
