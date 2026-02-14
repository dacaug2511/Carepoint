import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import RescheduleModal from "../../components/patient/RescheduleModal";
import {
  getPatientAppointments,
  cancelAppointment,
  rescheduleAppointment
} from "../../services/appointmentApi";

const PatientAppointmentHistory = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);

  const loadAppointments = useCallback(() => {
    getPatientAppointments(user.patientId)
      .then(res => setAppointments(res.data))
      .catch(() => toast.error("Failed to load appointments"));
  }, [user.patientId]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      toast.success("Appointment cancelled");
      loadAppointments();
    } catch {
      toast.error("Cancel failed");
    }
  };

  const openReschedule = (appt) => {
    setSelectedAppt(appt);
    setShowModal(true);
  };

  const handleReschedule = async (data) => {
    try {
      await rescheduleAppointment(selectedAppt.appointmentId, data);
      toast.success("Appointment rescheduled");
      setShowModal(false);
      loadAppointments();
    } catch {
      toast.error("Reschedule failed");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Your Appointments</h4>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Doctor ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt, index) => (
              <tr key={appt.appointmentId}>
                <td>{index + 1}</td>
                <td>{appt.doctorId}</td>
                <td>{appt.appointmentDate}</td>
                <td>{appt.slotTime}</td>
                <td>
                  <Badge
                    bg={
                      appt.status === "SCHEDULED"
                        ? "success"
                        : appt.status === "CANCELLED"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {appt.status}
                  </Badge>
                </td>
                <td>
                  {(appt.status === "SCHEDULED" ||
                    appt.status === "RESCHEDULED") && (
                    <>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          handleCancel(appt.appointmentId)
                        }
                      >
                        Cancel
                      </Button>

                      <Button
                        variant="warning"
                        size="sm"
                        className="ms-2"
                        onClick={() => openReschedule(appt)}
                      >
                        Reschedule
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showModal && selectedAppt && (
        <RescheduleModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onSubmit={handleReschedule}
          doctorId={selectedAppt.doctorId}
        />
      )}
    </div>
  );
};

export default PatientAppointmentHistory;



// import React, { useEffect, useState, useCallback } from "react";
// import { toast } from "react-toastify";
// import AppointmentCard from "../../components/patient/AppointmentCard";
// import RescheduleModal from "../../components/patient/RescheduleModal";
// import {
//   getPatientAppointments,
//   cancelAppointment,
//   rescheduleAppointment
// } from "../../services/appointmentApi";

// const PatientAppointmentHistory = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [appointments, setAppointments] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedAppt, setSelectedAppt] = useState(null);

//   // ✅ FIX: useCallback
//   const loadAppointments = useCallback(() => {
//     getPatientAppointments(user.patientId)
//       .then(res => setAppointments(res.data))
//       .catch(() => toast.error("Failed to load appointments"));
//   }, [user.patientId]);

//   // ✅ FIX: dependency added
//   useEffect(() => {
//     loadAppointments();
//   }, [loadAppointments]);

//   const handleCancel = async (id) => {
//     try {
//       await cancelAppointment(id);
//       toast.success("Appointment cancelled");
//       loadAppointments();
//     } catch {
//       toast.error("Cancel failed");
//     }
//   };

//   const openReschedule = (appt) => {
//     setSelectedAppt(appt);
//     setShowModal(true);
//   };

//   const handleReschedule = async (data) => {
//     try {
//       await rescheduleAppointment(selectedAppt.appointmentId, data);
//       toast.success("Appointment rescheduled");
//       setShowModal(false);
//       loadAppointments();
//     } catch {
//       toast.error("Reschedule failed");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h4>Your Appointments</h4>

//       {appointments.map(appt => (
//         <AppointmentCard
//           key={appt.appointmentId}
//           appt={appt}
//           onCancel={handleCancel}
//           onReschedule={openReschedule}
//         />
//       ))}

//       {showModal && selectedAppt && (
//   <RescheduleModal
//     show={showModal}
//     onHide={() => setShowModal(false)}
//     onSubmit={handleReschedule}
//     doctorId={selectedAppt.doctorId}
//   />
// )}

//     </div>
//   );
// };

// export default PatientAppointmentHistory;
