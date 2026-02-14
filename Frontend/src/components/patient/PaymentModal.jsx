import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const PaymentModal = ({
  show,
  onClose,
  selectedSlot,
  selectedDoctor,
  selectedDate
}) => {
  const [paymentMode, setPaymentMode] = useState("UPI");

  const user = JSON.parse(localStorage.getItem("user"));

  const generateTxnId = () => {
    return "TXN" + Date.now(); // ✅ frontend-generated txn
  };

  const handlePayment = async () => {
    if (!selectedSlot) {
      alert("No slot selected");
      return;
    }

    const payload = {
      patientId: user.patientId,
      doctorId: selectedDoctor.doctorId,
      appointmentDate: selectedDate.toISOString().split("T")[0],
      slotTime: selectedSlot.time,
      amount: selectedDoctor.consultationFee,
      paymentMode: paymentMode,
      transactionId: generateTxnId() // STRING
    };

    try {
      await axios.post(
        "http://localhost:8080/api/appointments/confirm-payment",
        payload
      );
      alert("Appointment booked successfully");
onClose();
window.location.href = "/patient/appointments";

    } catch (err) {
      alert(err.response?.data || "Booking failed");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Check
            type="radio"
            label="UPI"
            name="pay"
            checked={paymentMode === "UPI"}
            onChange={() => setPaymentMode("UPI")}
          />
          <Form.Check
            type="radio"
            label="Card"
            name="pay"
            onChange={() => setPaymentMode("CARD")}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={handlePayment}>
          Pay Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
