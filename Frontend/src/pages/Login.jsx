import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.username || !form.password) {
    toast.error("All fields are required");
    return;
  }

  try {
    const result = await dispatch(
      login({ uname: form.username, password: form.password })
    );

    const response = result.payload;

    if (!response?.success) {
      toast.error(response?.message || "Login failed");
      return;
    }

    toast.success("Login successful");

    const role = response.data.role;

    if (role === "PATIENT") {
      navigate("/patient/dashboard");
    } else if (role === "DOCTOR") {
      navigate("/doctor/dashboard");
    } else if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      toast.error("Unknown role");
    }

  } catch (err) {
    console.error(err);
    toast.error("Login failed");
  }
};


  

  return (
    <div
      style={{
        backgroundImage: "url('/images/loginBG.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        className="container p-4 shadow"
        style={{
          maxWidth: 400,
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "18px"
        }}
      >
        <h4 className="mb-3 text-center">Login</h4>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            type="password"
            className="form-control mb-2"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        <hr />

        <div className="text-center">
          <p>New User?</p>
          <button
            className="btn btn-outline-success me-2"
            onClick={() => navigate("/register/patient")}
          >
            Register as Patient
          </button>

          <button
            className="btn btn-outline-warning"
            onClick={() => navigate("/register/doctor")}
          >
            Register as Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
