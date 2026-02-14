import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const AppointmentCard = ({ appt, onCancel, onReschedule }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <h6>Doctor ID: {appt.doctorId}</h6>

        <p>Date: {appt.appointmentDate}</p>
        <p>Time: {appt.slotTime}</p>

        <Badge bg={
          appt.status === "SCHEDULED"
            ? "success"
            : appt.status === "CANCELLED"
            ? "danger"
            : "warning"
        }>
          {appt.status}
        </Badge>

        {(appt.status === "SCHEDULED" || appt.status === "RESCHEDULED") && (
  <div className="mt-3">
    <Button
      variant="danger"
      size="sm"
      onClick={() => onCancel(appt.appointmentId)}
    >
      Cancel
    </Button>

    <Button
      variant="warning"
      size="sm"
      className="ms-2"
      onClick={() => onReschedule(appt)}
    >
      Reschedule
    </Button>
  </div>
)}

      </Card.Body>
    </Card>
  );
};

export default AppointmentCard;
