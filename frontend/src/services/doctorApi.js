import axiosInstance from "../utils/axiosInstance";

export const getDoctorAppointments = async () => {
  const response = await axiosInstance.get(
    "/api/doctor/appointments"
  );
  return response.data;
};

export const saveDoctorAvailability = async (availability) => {
  const response = await axiosInstance.post(
    "/api/doctor/availability",
    availability
  );
  return response.data;
};