import axios from "axios";

const BASE_URL = "http://localhost:8081/api";

export const getDoctorAppointments = (doctorId, date) =>
  axios.get(`${BASE_URL}/doctor/appointments/${doctorId}/${date}`);

export const updateAppointmentStatus = (appointmentId, status) =>
  axios.post(`${BASE_URL}/doctor/appointments/status`, {
    appointmentId,
    status
  });

export const getDoctorAvailability = (doctorId) =>
  axios.get(`${BASE_URL}/availability/doctor/${doctorId}`);

export const saveAvailability = (data) =>
  axios.post(`${BASE_URL}/availability/availability`, data);