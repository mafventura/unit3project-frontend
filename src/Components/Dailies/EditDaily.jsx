import { useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDailies } from "../../context/DailiesContext";

export default function EditDaily({
  showModal,
  handleClose,
  user,
  fetchQuicksData,
  selectedDailyId,
  quicks,
  setQuicks,
}) {

  const {
    hydrationLevel,
    handleHydrationChange,
    mood,
    handleMoodChange,
    sleepLevel,
    handleSleepChange,
    quote,
    handleQuoteChange,
    editDaily
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

  useEffect(() => {
    if (showModal) {
      populateFormFields();
    }
  });

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#3a7e54", fontSize: 40 }}>
          Dailies
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <h4 style={{ marginBottom: 20, color: "#3a7e54" }}>
              How much water have you drunk?
            </h4>
            <select
              ref={waterRef}
              value={hydrationLevel}
              onChange={handleHydrationChange}
              style={{ borderRadius: "8px", padding: "5px" }}
            >
              <option value="">Select an option</option>
              <option value="0.5">💧 (0.5 litre)</option>
              <option value="1">💧💧 (1 litre)</option>
              <option value="1.5">💧💧💧 (1.5 litre)</option>
              <option value="2">💧💧💧💧 (2 litre)</option>
            </select>
          </li>
        </ul>

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
              <option value="0-4">🌙 (0 to 4 hours)</option>
              <option value="4-6">🌙🌙 (4 to 6 hours)</option>
              <option value="6-8">🌙🌙🌙 (6 to 8 hours)</option>
              <option value="8+">🌙🌙🌙🌙 (8+ hours)</option>
            </select>
          </li>
        </ul>

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
