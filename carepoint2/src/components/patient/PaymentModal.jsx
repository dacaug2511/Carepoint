import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaymentModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Check type="radio" label="Credit Card" name="pay" />
          <Form.Check type="radio" label="Debit Card" name="pay" />
          <Form.Check type="radio" label="UPI" name="pay" />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success">Pay Now</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
