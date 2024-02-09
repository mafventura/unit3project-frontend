import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "react-datepicker/dist/react-datepicker.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import { useSchedule } from "../../context/ScheduleContext";
import { useUser } from "../../context/UserContext";

// type ValuePiece = Date | string | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Schedule({ showModal, handleClose }) {

  const { newSchedule, setNewSchedule, handleChangeCreate, getSchedule } = useSchedule()
  const { user } = useUser();

  async function addSchedule(e) {
    e.preventDefault();
    try {
        await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/schedules/add`,
            newSchedule,
            {
                headers: {
                    "user-email": user.email,
                    "Content-Type": "application/json",
                },
            }
        );
        setNewSchedule({
            date: new Date(),
            time: ["10:00", "11:00"],
            event: "",
        });
        getSchedule();
    } catch (error) {
        console.error(error);
    }
}

  return (
    <Modal show={showModal} onHide={handleClose}>
  <Form onSubmit={addSchedule}>
    <Modal.Header closeButton>
    <Modal.Title style={{ color: "#3a7e54", fontSize: 40 }}>New Event</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Date</Form.Label>
        <br />
        <DatePicker
          selected={newSchedule.date}
          dateFormat="dd-MM-y"
          value={newSchedule.date}
          onChange={(date) => handleChangeCreate("date", date)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="amount">
        <Form.Label>Time</Form.Label>
        <br />
        <TimeRangePicker
          onChange={(time) => handleChangeCreate("time", time)}
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
          onChange={(e) => handleChangeCreate("event", e.target.value)}
        />
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button
        type="submit"
        variant="success"
        onClick={() => {
          handleClose();
          getSchedule()
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
