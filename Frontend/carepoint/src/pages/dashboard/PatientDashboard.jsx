import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DoctorCard from '../../components/patient/DoctorCard';
import SlotSelector from '../../components/patient/SlotSelector';
import PaymentModal from '../../components/patient/PaymentModal';

const doctors = [
  {
    doctorId: 1,
    firstName: 'Amit',
    lastName: 'Sharma',
    specialization: 'Cardiologist',
    fee: 500,
    // description: '10+ years experience',
    photo: 'https://via.placeholder.com/300'
  }
];

const slotsData = [
  { time: '10:00 AM', booked: false },
  { time: '11:00 AM', booked: true },
  { time: '12:00 PM', booked: false }
];

const PatientDashboard = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h4>Available Doctors</h4>
          {doctors.map(doc => (
            <DoctorCard key={doc.doctorId} doctor={doc} onSelect={setSelectedDoctor} />
          ))}
        </Col>

        <Col md={4}>
          {selectedDoctor && (
            <>
              <h5>Dr. {selectedDoctor.firstName}</h5>
              <SlotSelector
                slots={slotsData}
                onConfirm={() => setShowPayment(true)}
              />
            </>
          )}
        </Col>
      </Row>

      <PaymentModal show={showPayment} onClose={() => setShowPayment(false)} />
    </Container>
  );
};

export default PatientDashboard;
