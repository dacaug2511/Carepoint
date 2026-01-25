import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

export const loginUser = async (uname, password) => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    null,
    {
      params: { uname, password }
    }
  );
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await axios.put(
    `${BASE_URL}/reset-password`,
    data
  );
  return response.data;
};


export const registerPatient = (data) =>
  axios.post(`${BASE_URL}/register/patient`, data);

export const registerDoctor = (data) =>
  axios.post(`${BASE_URL}/register/doctor`, data);
