import React from 'react';
import { Card, Button } from 'react-bootstrap';

const DoctorCard = ({ doctor, onSelect }) => {
  return (
    <Card className="shadow mb-4">
      <Card.Img variant="top" src={doctor.photo} height="220" />
      <Card.Body>
        <Card.Title>Dr. {doctor.firstName} {doctor.lastName}</Card.Title>
        <Card.Text>
          <strong>Specialization:</strong> {doctor.specialization}<br />
          <strong>Fee:</strong> ₹{doctor.fee}<br />
          <small>{doctor.description}</small>
        </Card.Text>
        <Button onClick={() => onSelect(doctor)}>Book Appointment</Button>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;
