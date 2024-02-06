import React, { useState } from "react";
import { Modal, Button, Form, Tabs } from "react-bootstrap";
import DatePicker from "react-datepicker";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "react-datepicker/dist/react-datepicker.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";

type ValuePiece = Date | string | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Schedule({ showModal, handleClose }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(["10:00", "11:00"]);
  const [event, setEvent] = useState("")

  function handleAddSchedule() {
    console.log(date);
    console.log(time);
    console.log(event);

    setDate(new Date());
    setTime(["10:00", "11:00"]);
    setEvent("");
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Event to Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Date</Form.Label>
          <br />
          <DatePicker selected={date} dateFormat="dd-MM-y" onChange={(date) => setDate(date)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>Time</Form.Label>
          <br />
          <TimeRangePicker onChange={(time) => setTime(time)} value={time} disableClock={true} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Event</Form.Label>
          <Form.Control type="text" required value={event} onChange={(e) => setEvent(e.target.value)}/>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            handleAddSchedule();
            handleClose()
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
    </Modal>
  );
}
