import axios from "axios";

const API_URL = "http://localhost:8080/api/Report/get-report";

export const getReportByPatientId = (patientId) => {
  return axios.get(`${API_URL}?id=${patientId}`);
};

export const viewDiagnosis = (patientId) => {
  return axios.get(
    `http://localhost:8080/api/Report/view-diagnosis/${patientId}`
  );
};

export const getReport = (patientId) => {
  return axios.get(
    `http://localhost:8080/api/Report/genrateReport/${patientId}`
  );
};




export const getMedicalHistory = (patientId) => {
  return axios.get(`http://localhost:8080/api/history/MedicalHistory/${patientId}`);
};


export const getReportByAppointmentId = (id) => {
  return axios.get(`http://localhost:8080/api/report/getReport/${id}`);
};

export const updateReport = (patientId, data) => {
  return axios.put(
    `http://localhost:8080/api/Report/update/${patientId}`,
    data
  );
};

export const doctorFeedback = (username) => {
  return axios.get(
  `http://localhost:8080/api/Admin/doctor-feedback/${username}`
);
};



