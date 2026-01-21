import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

export const registerUser = (data) =>
  axios.post(`${API_BASE}/auth/register`, data);

export const forgotPassword = (data) =>
  axios.post(`${API_BASE}/auth/forgot-password`, data);

const API = axios.create({
  baseURL: "http://localhost:8080",
});