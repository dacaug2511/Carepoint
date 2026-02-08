import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import DoctorCard from "../../components/patient/DoctorCard";
import SlotSelector from "../../components/patient/SlotSelector";
import PaymentModal from "../../components/patient/PaymentModal";
import SpecializationList from "../../components/patient/SpecializationList";
import PatientAppointmentHistory from "../../components/patient/PatientAppointmentHistory";

const PatientDashboard = () => {
  const navigate = useNavigate();

  /* ================= DASHBOARD VIEW ================= */
  const [activeView, setActiveView] = useState(null); // "BOOK" | "VIEW"

  /* ================= BOOKING STATES ================= */
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [showPayment, setShowPayment] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "PATIENT") {
      navigate("/login");
    }
  }, [navigate]);

  /* ================= LOAD DOCTORS ================= */
  useEffect(() => {
    if (selectedSpecialization) {
      fetch(
        `http://localhost:8080/api/doctors/by-specialization/${selectedSpecialization.specializationId}`
      )
        .then(res => res.json())
        .then(data => setDoctors(Array.isArray(data) ? data : []))
        .catch(err => console.error(err));
    }
  }, [selectedSpecialization]);

  /* ================= LOAD AVAILABILITY ================= */
  useEffect(() => {
    if (selectedDoctor) {
      fetch(`http://localhost:8080/api/availability/doctor/${selectedDoctor.doctorId}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setAvailability(data);
          else if (data) setAvailability([data]);
          else setAvailability([]);
        })
        .catch(err => console.error(err));
    }
  }, [selectedDoctor]);

  /* ================= LOAD BOOKED SLOTS ================= */
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];

      fetch(
        `http://localhost:8080/api/doctor/appointments/${selectedDoctor.doctorId}/${dateStr}`
      )
        .then(res => res.json())
        .then(data => {
          const booked = data.map(a =>
            a.slotTime.length > 5 ? a.slotTime.substring(0, 5) : a.slotTime
          );
          setBookedSlots(booked);
        })
        .catch(err => console.error(err));
    }
  }, [selectedDoctor, selectedDate]);

  useEffect(() => {
    setSlots(prev =>
      prev.map(slot => ({
        ...slot,
        booked: bookedSlots.includes(slot.time.substring(0, 5))
      }))
    );
  }, [bookedSlots]);

  /* ================= HELPERS ================= */
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const normalizeTime = (time) => time.substring(0, 5);

  const generateSlots = (from, to) => {
    if (!from || !to) return [];

    from = normalizeTime(from);
    to = normalizeTime(to);

    const result = [];
    let start = new Date(`1970-01-01T${from}`);
    const end = new Date(`1970-01-01T${to}`);

    while (start < end) {
      result.push({
        time: start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),
        booked: false
      });
      start.setMinutes(start.getMinutes() + 30);
    }

    return result;
  };

  /* ================= UI ================= */
  return (
    <Container className="mt-4">

    {/* ===== DASHBOARD OPTIONS ===== */}
<div className="mb-4">
  <h4>Patient Dashboard</h4>

  <div className="d-flex gap-3 mt-3 flex-wrap">

    {/* APPOINTMENTS */}
    <button
      className={`btn ${activeView === "BOOK" ? "btn-success" : "btn-primary"}`}
      onClick={() => setActiveView("BOOK")}
    >
      Book Appointment
    </button>

    <button
      className={`btn ${activeView === "VIEW" ? "btn-success" : "btn-secondary"}`}
      onClick={() => setActiveView("VIEW")}
    >
      View Appointments
    </button>

    {/* MEDICAL RECORDS */}
    <button
      className="btn btn-outline-dark"
      onClick={() => navigate("/patient/medical-history")}
    >
      Medical History
    </button>

    <button
      className="btn btn-outline-info"
      onClick={() => navigate("/patient/reports")}
    >
      Reports
    </button>

    <button
      className="btn btn-outline-success"
      onClick={() => navigate("/patient/diagnosis")}
    >
      Diagnosis
    </button>

  </div>
</div>


      {/* ===== BOOK APPOINTMENT VIEW ===== */}
      {activeView === "BOOK" && (
        <Row>
          {/* LEFT SIDE */}
          <Col md={8}>
            {!selectedSpecialization && (
              <>
                <h4>Select Specialization</h4>
                <SpecializationList onSelect={setSelectedSpecialization} />
              </>
            )}

            {selectedSpecialization && !selectedDoctor && (
              <>
                <h4>
                  Doctors for {selectedSpecialization.specializationName}
                </h4>

                {doctors.length === 0 && <p>No doctors available</p>}

                {doctors.map(doc => (
                  <DoctorCard
                    key={doc.doctorId}
                    doctor={doc}
                    onSelect={setSelectedDoctor}
                  />
                ))}
              </>
            )}
          </Col>

          {/* RIGHT SIDE */}
          <Col md={4}>
            {selectedDoctor && (
              <>
                <h5>
                  Dr. {selectedDoctor.user?.firstName}{" "}
                  {selectedDoctor.user?.lastName}
                </h5>

                <p>Fee: ₹{selectedDoctor.consultationFee}</p>

                <h6>Select Date</h6>

                {getNext7Days().map(date => {
                  const dayName = date.toLocaleDateString("en-US", {
                    weekday: "long"
                  });

                  const dayAvailability = availability.find(
                    a => a.day.toUpperCase() === dayName.toUpperCase()
                  );

                  return (
                    <button
                      key={date.toDateString()}
                      disabled={!dayAvailability}
                      style={{ margin: "5px" }}
                      onClick={() => {
                        setSelectedDate(date);
                        if (dayAvailability) {
                          const from =
                            dayAvailability.fromTime ||
                            dayAvailability.availableFrom;

                          const to =
                            dayAvailability.toTime ||
                            dayAvailability.availableTo;

                          setSlots(generateSlots(from, to));
                        }
                      }}
                    >
                      {date.toDateString()}
                    </button>
                  );
                })}

                {selectedDate && (
                  <>
                    <h6 className="mt-3">Available Slots</h6>
                    <SlotSelector
                      slots={slots}
                      onConfirm={(slot) => {
                        setSelectedSlot(slot);
                        setShowPayment(true);
                      }}
                    />
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
      )}

      {/* ===== VIEW APPOINTMENTS ===== */}
      {activeView === "VIEW" && (
        <>
          <hr className="my-4" />
          <PatientAppointmentHistory />
        </>
      )}

      {/* ===== PAYMENT MODAL ===== */}
      <PaymentModal
        show={showPayment}
        onClose={() => setShowPayment(false)}
        selectedSlot={selectedSlot}
        selectedDoctor={selectedDoctor}
        selectedDate={selectedDate}
      />

    </Container>
  );
};

export default PatientDashboard;
