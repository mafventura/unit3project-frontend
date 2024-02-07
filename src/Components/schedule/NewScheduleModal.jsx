import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "react-datepicker/dist/react-datepicker.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";

// type ValuePiece = Date | string | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Schedule({ showModal, handleClose, user, fetchDataSchedule }) {

  const [newSchedule, setNewSchedule] = useState({
    date: new Date(),
    time: ["10:00", "11:00"],
    event: "",
  });

  function handleChange(name, value) {
    setNewSchedule({
      ...newSchedule,
      [name]: value,
    });
  }

  async function handleAddSchedule(evt) {
    evt.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/schedules/add`, newSchedule, {
        headers: {
          "user-email": user.email,
          "Content-Type": "application/json",
        },
      });
      setNewSchedule({
        date: new Date(),
        time: ["10:00", "11:00"],
        event: "",
      });
      fetchDataSchedule()
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Form onSubmit={handleAddSchedule}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event to Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Date</Form.Label>
            <br />
            <DatePicker
              selected={newSchedule.date}
              dateFormat="dd-MM-y"
              value={newSchedule.date}
              onChange={(date) => handleChange("date", date)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Time</Form.Label>
            <br />
            <TimeRangePicker
              onChange={(time) => handleChange("time", time)}
              value={newSchedule.time}
              disableClock={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Event</Form.Label>
            <Form.Control
              type="text"
              required
              value={newSchedule.event}
              onChange={(e) => handleChange("event", e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="success"
            onClick={(evt) => {
              handleAddSchedule(evt);
              handleClose();
            }}
          >
            Add
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
