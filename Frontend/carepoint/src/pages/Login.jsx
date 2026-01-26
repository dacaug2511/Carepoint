import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();
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
     const response = await loginUser(form.username, form.password);

if (!response.success) {
  toast.error(response.message);
  return;
}

const user = response.data;

// Save session
localStorage.setItem("user", JSON.stringify(user));

toast.success("Login successful");

// ROLE BASED REDIRECT
const rid = user.role?.rid;

if (rid === 2) {
  navigate("/patient/dashboard");
} else if (rid === 3) {
  navigate("/doctor/dashboard");
} else if (rid === 1) {
  navigate("/admin/dashboard");
} else {
  toast.error("Unknown role");
}


    } catch (err) {
      toast.error("Invalid username or password");
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
