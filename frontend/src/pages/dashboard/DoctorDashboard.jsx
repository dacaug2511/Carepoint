import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Card,
  Table,
  Form,
  Badge,
  Button
} from "react-bootstrap";


import {
  fetchDoctorAppointments,
  updateAppointmentStatus,
  saveDoctorAvailability
} from "../../services/appointmentApi";

/* ================= CONSTANTS ================= */
const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday", "Sunday"
];


const DoctorDashboard = () => {


  /* ================= AUTH ================= */
  const { user, isAuthenticated } = useSelector(state => state.auth);

  const doctorId = user?.doctorId || user?.id;

  console.log("AUTH USER:", user);
  /* ================= STATE ================= */
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [availability, setAvailability] = useState(
    DAYS_OF_WEEK.map(day => ({
      day,
      slots: [{ from: "", to: "" }]
    }))
  );

  /* ================= LOAD APPOINTMENTS ================= */
  const loadAppointments = async () => {
    if (!doctorId) return;

    try {
      setLoading(true);
      const res = await fetchDoctorAppointments(doctorId);
      setAppointments(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) {
      loadAppointments();
    }
  }, [doctorId]);

  /* ================= UPDATE STATUS ================= */
  const handleStatusChange = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      loadAppointments();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  /* ================= AVAILABILITY ================= */
  const handleSlotChange = (dayIndex, slotIndex, field, value) => {
    const copy = [...availability];
    copy[dayIndex].slots[slotIndex][field] = value;
    setAvailability(copy);
  };

  const addSlot = (dayIndex) => {
    const copy = [...availability];
    copy[dayIndex].slots.push({ from: "", to: "" });
    setAvailability(copy);
  };

  const saveAvailabilityHandler = async () => {
    if (!doctorId) {
      alert("Doctor not logged in");
      return;
    }

    const payload = [];

    availability.forEach(day =>
      day.slots.forEach(slot => {
        if (slot.from && slot.to) {
          payload.push({
            day: day.day,
            from: slot.from,
            to: slot.to
          });
        }
      })
    );

    if (payload.length === 0) {
      alert("Add at least one slot");
      return;
    }

    try {
      await saveDoctorAvailability(doctorId, payload);
      alert("Availability saved");
    } catch {
      alert("Failed to save availability");
    }
  };

  /* ================= UI HELPERS ================= */
  const badge = (status) => {
    if (status === "Scheduled") return <Badge bg="warning">Scheduled</Badge>;
    if (status === "Completed") return <Badge bg="success">Completed</Badge>;
    if (status === "Cancelled") return <Badge bg="danger">Cancelled</Badge>;
    return <Badge bg="secondary">{status}</Badge>;
  };

  /* ================= AUTH GUARDS ================= */
  if (!isAuthenticated) {
    return <h4 className="text-center mt-5">Please login</h4>;
  }

  if (!doctorId) {
    return <h4 className="text-center mt-5">Loading doctor data...</h4>;
  }

  /* ================= UI ================= */
  return (
    <Container className="mt-4">
      <h3>Doctor Dashboard</h3>

      {/* ================= APPOINTMENTS ================= */}
      <Card className="p-3 mb-4">
        <h5>Patient Appointments</h5>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(a => (
                <tr key={a.appointmentId}>
                  <td>{a.patientId}</td>
                  <td>{a.appointmentDate}</td>
                  <td>{a.slotTime?.substring(0, 5)}</td>
                  <td>{badge(a.status)}</td>
                  <td>
                    <Form.Select
                      value={a.status}
                      onChange={(e) =>
                        handleStatusChange(
                          a.appointmentId,
                          e.target.value
                        )
                      }
                    >
                      <option>Scheduled</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* ================= AVAILABILITY ================= */}
      <Card className="p-3">
        <h5>Weekly Availability</h5>

        {availability.map((day, di) => (
          <div key={day.day} className="mb-3">
            <strong>{day.day}</strong>

            {day.slots.map((slot, si) => (
              <div key={si} className="d-flex gap-2 mt-2">
                <Form.Control
                  type="time"
                  value={slot.from}
                  onChange={e =>
                    handleSlotChange(di, si, "from", e.target.value)
                  }
                />
                <Form.Control
                  type="time"
                  value={slot.to}
                  onChange={e =>
                    handleSlotChange(di, si, "to", e.target.value)
                  }
                />
              </div>
            ))}

            <Button
              size="sm"
              className="mt-2"
              onClick={() => addSlot(di)}
            >
              + Add Slot
            </Button>
          </div>
        ))}

        <Button className="w-100 mt-3" onClick={saveAvailabilityHandler}>
          Save Availability
        </Button>
      </Card>
    </Container>
  );
};

export default DoctorDashboard;