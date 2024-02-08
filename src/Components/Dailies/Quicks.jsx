import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const Quicks = ({
  showModal,
  handleClose,
  user,
  fetchQuicksData,
  selectedDaily,
  setSelectedDaily,
}) => {
  const [hydrationLevel, setHydrationLevel] = useState(""); 
  const [mood, setMood] = useState("");
  const [sleepLevel, setSleepLevel] = useState(""); 
  const [quote, setQuote] = useState("");

  const handleHydrationChange = (event) => {
    setHydrationLevel(event.target.value);
  };

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const handleSleepChange = (event) => {
    setSleepLevel(event.target.value);
  };

  const handleQuoteChange = (event) => {
    setQuote(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (hydrationLevel === "" || mood === "" || sleepLevel === "" || quote === "") {
        alert("all fields required")
      }
      // Make a POST request to backend endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/dailies/add`,
        {
          water: hydrationLevel,
          mood,
          sleep: sleepLevel,
          quote,
        },
        {
          headers: {
            userEmail: user.email,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      console.log("Response from server:", response.data);
      fetchQuicksData();
      handleClose(); // Close the modal or perform any other actions on success
    } catch (error) {
      console.error("Error sending data to server:", error);
      // Handle errors or provide user feedback
    }
  };

  // useEffect(() => {
  //   // Load saved state from localStorage on component mount
  //   const savedState = JSON.parse(localStorage.getItem("quicksState")) || {};
  //   setHydrationLevel(savedState.hydrationLevel || 1);
  //   setMood(savedState.mood || "");
  //   setSleepLevel(savedState.sleepLevel || 1);
  //   setQuote(savedState.quote || "");
  // }, []);

  useEffect(() => {
    // Save state to localStorage whenever it changes
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
          Dailies
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add some styles to the lists */}
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
        {/* </Tab> */}
        {/* <Tab eventKey="sleep" title="Sleep"> */}
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
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Quicks;
