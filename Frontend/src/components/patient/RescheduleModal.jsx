import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  getAvailableDates,
  getAvailableSlots
} from "../../services/appointmentApi";

const RescheduleModal = ({ show, onHide, onSubmit, doctorId }) => {
  const [dates, setDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // load available dates
  useEffect(() => {
    if (show) {
      getAvailableDates(doctorId)
        .then(res => setDates(res.data))
        .catch(() => setDates([]));
    }
  }, [show, doctorId]);

  // load slots when date changes
  useEffect(() => {
    if (selectedDate) {
      getAvailableSlots(doctorId, selectedDate)
        .then(res => setSlots(res.data))
        .catch(() => setSlots([]));
    }
  }, [selectedDate, doctorId]);

  const handleSubmit = () => {
   onSubmit({
  newDate: selectedDate,
  newSlot: selectedSlot.slice(0, 5)
});

  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reschedule Appointment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          {/* DATE OPTIONS */}
          <Form.Group className="mb-3">
            <Form.Label>Select Date</Form.Label>
            <Form.Select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">-- Select Date --</option>
              {dates.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* SLOT OPTIONS */}
          {selectedDate && (
            <Form.Group>
              <Form.Label>Select Slot</Form.Label>
              <Form.Select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="">-- Select Slot --</option>
                {slots.map(s => {
  const formattedTime = s.slotTime.slice(0, 5); // HH:mm

  return (
    <option
      key={formattedTime}
      value={formattedTime}
    >
      {formattedTime}
    </option>
  );
})}

              </Form.Select>
            </Form.Group>
          )}

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={!selectedDate || !selectedSlot}
          onClick={handleSubmit}
        >
          Reschedule
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RescheduleModal;
