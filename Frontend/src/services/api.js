import axios from "axios";

const AUTH_BASE_URL = "http://localhost:8080/auth";
const ADMIN_BASE_URL = "http://localhost:8080/admin";
const PATIENT_BASE_URL = "http://localhost:8080/patient";

// LOGIN
export const loginUser = async (uname, password) => {
  const response = await axios.post(`${AUTH_BASE_URL}/login`, {
    uname,
    password
  });
  return response.data;
};

// FORGOT PASSWORD
export const forgotPassword = async (data) => {
  const response = await axios.put(
    `${AUTH_BASE_URL}/reset-password`,
    data
  );
  return response.data;
};

//REGISTER PATIENT
export const registerPatient = (data) =>
  axios.post(`${PATIENT_BASE_URL}/register`, data);

// REGISTER DOCTOR
export const registerDoctor = (data) =>
  axios.post(`http://localhost:8080/doctor/register`, data);

// ================= ADMIN APIs =================

//FETCH ALL DOCTORS
export const fetchAllDoctors = () =>
  axios.get(`${ADMIN_BASE_URL}/doctors`);

// APPROVE DOCTOR
export const approveDoctor = (id) =>
  axios.put(`${ADMIN_BASE_URL}/doctor/${id}/approve`);

// FETCH ALL PATIENTS
export const fetchAllPatients = () =>
  axios.get(`${ADMIN_BASE_URL}/patients`);
