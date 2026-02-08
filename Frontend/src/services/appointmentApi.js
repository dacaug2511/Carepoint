import axios from "axios";

const BASE_URL = "http://localhost:8080/api/appointments";

// ======================
// VIEW HISTORY
// ======================
export const getPatientAppointments = (patientId) =>
  axios.get(`${BASE_URL}/patient/${patientId}`);

// ======================
// CANCEL
// ======================
export const cancelAppointment = (appointmentId) =>
  axios.put(`${BASE_URL}/cancel/${appointmentId}`);

// ======================
// RESCHEDULE
// ======================
export const rescheduleAppointment = (appointmentId, data) =>
  axios.put(`${BASE_URL}/reschedule/${appointmentId}`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });

// ======================
// ✅ NEW: AVAILABLE DATES (7 days, doctor available)
// ======================
export const getAvailableDates = (doctorId) =>
  axios.get(`${BASE_URL}/available-dates/${doctorId}`);

// ======================
// ✅ NEW: AVAILABLE SLOTS (doctor + date)
// ======================
export const getAvailableSlots = (doctorId, date) =>
  axios.get(`${BASE_URL}/available-slots`, {
    params: { doctorId, date }
  });


  export const fetchDoctorAppointments = (doctorId) =>
  axios.get(`${BASE_URL}/doctor/${doctorId}`);

// ======================
// UPDATE STATUS
// ======================
export const updateAppointmentStatus = (appointmentId, status) =>
  axios.put(`${BASE_URL}/status/${appointmentId}`, { status });

// ======================
// SAVE DOCTOR AVAILABILITY
// ======================
export const saveDoctorAvailability = (data) =>
  axios.post(`http://localhost:8080/api/availability/save`, data);