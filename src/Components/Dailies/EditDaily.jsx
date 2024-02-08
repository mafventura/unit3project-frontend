import { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDailies } from "../../context/DailiesContext";
import axios from "axios";

export default function EditDaily({
  showModal,
  handleClose,
  user,
  fetchQuicksData,
  selectedDailyId,
  quicks,
  setQuicks
}) {
  console.log("THIS IS THE ID", selectedDailyId);

  const {
    hydrationLevel,
    handleHydrationChange,
    mood,
    handleMoodChange,
    sleepLevel,
    handleSleepChange,
    quote,
    handleQuoteChange,
  } = useDailies();

  const waterRef = useRef();
  const moodRef = useRef();
  const sleepRef = useRef();
  const quoteRef = useRef();

  async function populateFormFields() {
    try {
      const dailyToEdit = quicks.find((daily) => daily._id === selectedDailyId);

      if (dailyToEdit) {
        waterRef.current.value = dailyToEdit.water;
        moodRef.current.value = dailyToEdit.mood;
        sleepRef.current.value = dailyToEdit.sleep;
        quoteRef.current.value = dailyToEdit.quote;
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (showModal) {
      populateFormFields();
    }
  }, [showModal]);

  async function handleSubmit(e) {
    try {
      await editDaily(selectedDailyId, {
        water: waterRef.current.value,
        mood: moodRef.current.value,
        sleep: sleepRef.current.value,
        quote: quoteRef.current.value,
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  async function editDaily(selectedDailyId, updatedDaily) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/dailies/${selectedDailyId}`,
        updatedDaily
      );
      setQuicks([...quicks, response.data]);
    } catch (e) {
      console.log("Error editing quicks", e);
    }
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#3a7e54", fontSize: 40 }}>Dailies</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add some styles to the lists */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <h4 style={{ marginBottom: 20, color: "#3a7e54" }}>How much water have you drunk?</h4>
            <select
              ref={waterRef}
              value={hydrationLevel}
              onChange={handleHydrationChange}
              style={{ borderRadius: "8px", padding: "5px" }}
            >
              <option value="">Select an option</option>
              <option value="0.5">💧</option>
              <option value="1">💧💧</option>
              <option value="1.5">💧💧💧</option>
              <option value="2">💧💧💧💧</option>
            </select>
          </li>
        </ul>

        {/* </Tab> */}
        {/* <Tab eventKey="mood" title="Mood"> */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <h4 style={{ marginTop: 40, marginBottom: 20, color: "#3a7e54" }}>
              How are you feeling?
            </h4>
            <select
              value={mood}
              ref={moodRef}
              onChange={handleMoodChange}
              style={{ borderRadius: "8px", padding: "5px" }}
            >
              <option value="😃">😃 Happy</option>
              <option value="😎">😎 Relaxed</option>
              <option value="😐">😐 Neutral</option>
              <option value="😢">😢 Sad</option>
              <option value="😡">😡 Angry</option>
            </select>
          </li>
        </ul>
        {/* </Tab> */}
        {/* <Tab eventKey="sleep" title="Sleep"> */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <h4 style={{ marginTop: 40, marginBottom: 20, color: "#3a7e54" }}>
              How many hours did you sleep?
            </h4>
            <select
              ref={sleepRef}
              value={sleepLevel}
              onChange={handleSleepChange}
              style={{ borderRadius: "8px", padding: "5px" }}
            >
              <option value="">Select an option</option>
              <option value="0-4">🌙</option>
              <option value="4-6">🌙🌙</option>
              <option value="6-8">🌙🌙🌙</option>
              <option value="8+">🌙🌙🌙🌙</option>
            </select>
          </li>
        </ul>
        {/* </Tab> */}

        {/* <Tab eventKey="quote" title="Quote"> */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <h4 style={{ marginTop: 40, marginBottom: 20, color: "#3a7e54" }}>
              Enter an inspirational quote:
            </h4>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type your quote here..."
              value={quote}
              ref={quoteRef}
              onChange={handleQuoteChange}
            />
          </li>
        </ul>
        {/* </Tab> */}
        {/* </Tabs> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSubmit();
            fetchQuicksData();
          }}
          style={{ backgroundColor: "#3a7e54", borderColor: "#3a7e54" }}
        >
          Save Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
