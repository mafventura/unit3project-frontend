import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDailies } from "../../context/DailiesContext";

const Quicks = ({
  showModal,
  handleClose,
  user,
  fetchQuicksData,
  selectedDaily,
  setSelectedDaily,
}) => {

  const {
    hydrationLevel,
    handleHydrationChange,
    mood,
    handleMoodChange,
    sleepLevel,
    handleSleepChange,
    quote,
    handleQuoteChange,
    createDaily,
  } = useDailies();

  useEffect(() => {
    const stateToSave = {
      hydrationLevel,
      mood,
      sleepLevel,
      quote,
    };
    localStorage.setItem("quicksState", JSON.stringify(stateToSave));
  }, [hydrationLevel, mood, sleepLevel, quote]);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#3a7e54", fontSize: 40 }}>
          New Daily Check
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <h4 style={{ marginBottom: 20, color: "#3a7e54" }}>
              How much water have you drunk?
            </h4>
            <select
              value={hydrationLevel}
              onChange={handleHydrationChange}
              style={{ borderRadius: "8px", padding: "5px" }}
            >
              <option value="">Select an option</option>
              <option value="0.5">💧 (0.5 litre)</option>
              <option value="1">💧💧 (1 litre)</option>
              <option value="1.5">💧💧💧 (1.5 litres)</option>
              <option value="2">💧💧💧💧 (2litres)</option>
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
              onChange={handleMoodChange}
              style={{ borderRadius: "8px", padding: "5px" }}
            >
              <option value="">Select an option</option>
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
            createDaily();
            handleClose();
            fetchQuicksData();
          }}
          style={{ backgroundColor: "#3a7e54", borderColor: "#3a7e54" }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Quicks;
