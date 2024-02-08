import React from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { BsDroplet } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DisplayDaily({
  fetchQuicksData,
  quicks,
  setQuicks,
  quicksModal,
  setQuicksModal,
  selectedDaily,
  setSelectedDaily,
}) {
  // console.log("these are the quicks", quicks);

  console.log(quicks);

  const today = new Date();
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const objectsFromToday = quicks.filter((quick) => {
    const createdAtDate = new Date(quick.createdAt);
    const createdAtDateOnly = new Date(
      createdAtDate.getFullYear(),
      createdAtDate.getMonth(),
      createdAtDate.getDate()
    );
    return createdAtDateOnly.getTime() === todayDate.getTime();
  });


  async function updateDailyOnServer(updatedDaily) {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/dailies/${updatedDaily._id}`,
        updatedDaily,
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await fetchQuicksData();
    } catch (e) {
      console.error(e);
    }
  }

  function handleButtonClick(id) {
    setSelectedDaily(id);
    setQuicksModal(true);
    // console.log(id)
    // setQuicks({
    //   water: id.water,
    //   mood: id.mood,
    //   sleep: id.sleep,
    //   quote: id.quote
    // })
    console.log(quicks)
  }

  // const { editExpense, getBudgets, getExpenses, expenses } = useBudgets() 

    // useEffect(() => {
        // Function to fetch expense details and populate form fields
        async function populateFormFields(dailyCheck, index) {
            try {
                const dailyToEdit = quicks.find(daily => dailyCheck.id === index);

                if (dailyToEdit) {
                    dailyCheck.water.current.value = dailyToEdit.description;
                    amountRef.current.value = dailyToEdit.amount;
                }
            } catch (error) {
                console.error(error)
            }
        }

        // Call the function to populate form fields when the modal is shown
        if (show) {
            populateFormFields()
        }
    // }, [show, expenseId, expenses])

  function handleDailyChange(id) {
    const updatedDailies = [...quicks]
    const daily = updatedDailies.find(daily => daily._id === id)
    console.log(daily)
  }

  async function deleteDaily(dailyId, index) {
    console.log(dailyId)
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/dailies/${dailyId}`
      );
      deleteCompletedDaily(index);
      await fetchQuicksData()
    } catch (e) {
      console.error(e);
    }
  }

  function deleteCompletedDaily(index) {
    const updatedDailies = quicks.filter((idx) => index !== idx);
    setQuicksModal(updatedDailies);
  }

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
                onClick={() => {
                  handleButtonClick(dailyCheck);
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
                onClick={() => deleteDaily(dailyCheck._id, index)}
              >
                <MdDeleteOutline />
              </Button>
            </Container>
          ))}
        </>
      )}

<Modal show={quicksModal} onHide={() => setQuicksModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Daily Check</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDaily && (
            <>
              {/* Render details of the selected daily check in the modal */}
              <p>Water: {selectedDaily.water}</p>
              <p>Mood: {selectedDaily.mood}</p>
              <p>Sleep: {selectedDaily.sleep}</p>
              <p>Quote: {selectedDaily.quote}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
