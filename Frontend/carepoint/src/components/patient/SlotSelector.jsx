import React, { useState } from 'react';
import { Button, Badge } from 'react-bootstrap';

const SlotSelector = ({ slots, onConfirm }) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <h6>Select Time Slot</h6>
      {slots.map((slot) => (
        <Button
          key={slot.time}
          className="m-1"
          variant={slot.booked ? 'secondary' : 'outline-primary'}
          disabled={slot.booked}
          onClick={() => setSelected(slot)}
        >
          {slot.time} {slot.booked && <Badge bg="danger">Booked</Badge>}
        </Button>
      ))}

      <div className="mt-3">
        <Button
          disabled={!selected}
          onClick={() => onConfirm(selected)}
        >
          Proceed to Payment
        </Button>
      </div>
    </>
  );
};

export default SlotSelector;
