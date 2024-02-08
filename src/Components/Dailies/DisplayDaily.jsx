import React from "react";
import { Container, Button } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import EditDaily from "./EditDaily"
import { useState } from "react";
import { useDailies } from "../../context/DailiesContext";

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

  const { deleteDaily } = useDailies()

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



  return (
    <div>
      {objectsFromToday.length === 0 ? (
        <p>No daily checks created today.</p>
      ) : (
        <>
          {objectsFromToday.map((dailyCheck, index) => (
            <Container key={dailyCheck._id} className="d-flex">
              <p className="p-2">
                Water:{" "}
                {dailyCheck.water === "0.5" ? (
                  <>
                    💧 (0.5 litre)
                  </>
                ) : dailyCheck.water === "1" ? (
                  <>
                    💧
                    💧
                    (1 litre)
                  </>
                ) : dailyCheck.water === "1.5" ? (
                  <>
                    💧
                    💧
                    💧
                    (1.5 litre)
                  </>
                ) : dailyCheck.water === "2" ? (
                  <>
                    💧
                    💧
                    💧
                    💧
                    (2 litre)
                  </>
                ) : null}
              </p>
              <p className="p-2">Mood: {dailyCheck.mood}</p>
              <p className="p-2">
                Sleep:{" "}
                {dailyCheck.sleep === "0-4" ? (
                  <>
                    🌙 (0 to 4 hours)
                  </>
                ) : dailyCheck.sleep === "4-6" ? (
                  <>
                    🌙
                    🌙
                    
                    (4 to 6 hours)
                  </>
                ) : dailyCheck.sleep === "6-8" ? (
                  <>
                    🌙
                    🌙
                    🌙
                    (6 to 8 hours)
                  </>
                ) : dailyCheck.sleep === "8+" ? (
                  <>
                    🌙
                    🌙
                    🌙
                    🌙

                    (more than 8 hours)
                  </>
                ) : null}
              </p>

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
