import React, { useState } from "react";
import { registerUser } from "../services/api";
import { validatePassword } from "../utils/passwordValidator";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    role: "PATIENT",

    // common
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    emergencyContact: "",
    email: "",
    aadhar: "",
    password: "",

    // patient specific
    bloodGroup: "",

    // doctor specific
    baseQualification: "",
    postQualification: "",
    experience: "",
    consultationFee: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // password validation
    const passwordError = validatePassword(form.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    // phone validation
    if (!/^\d{10}$/.test(form.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    try {
      await registerUser(form);
      toast.success("Registration successful");
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-3">Register</h3>

      <form onSubmit={handleSubmit}>
        {/* Role */}
        <select
          name="role"
          className="form-control mb-2"
          value={form.role}
          onChange={handleChange}
        >
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
        </select>

        {/* Common Fields */}
        <input className="form-control mb-2" name="firstName" placeholder="First Name" onChange={handleChange} />
        <input className="form-control mb-2" name="lastName" placeholder="Last Name" onChange={handleChange} />

        {/* Gender */}
        <div className="mb-2">
          <label className="me-3">
            <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
          </label>
        </div>

        <input className="form-control mb-2" name="phone" placeholder="Phone (10 digits)" onChange={handleChange} />
        <input className="form-control mb-2" name="emergencyContact" placeholder="Emergency Contact" onChange={handleChange} />
        <input className="form-control mb-2" name="email" placeholder="Email Address" onChange={handleChange} />
        <input className="form-control mb-2" name="aadhar" placeholder="Aadhar Number" onChange={handleChange} />

        {/* PATIENT FIELDS */}
        {form.role === "PATIENT" && (
          <>
            <input
              className="form-control mb-2"
              name="bloodGroup"
              placeholder="Blood Group (e.g. O+, A+)"
              onChange={handleChange}
            />
          </>
        )}

        {/* DOCTOR FIELDS */}
        {form.role === "DOCTOR" && (
          <>
            <input
              className="form-control mb-2"
              name="baseQualification"
              placeholder="Base Qualification (MBBS, BHMS)"
              onChange={handleChange}
            />

            <select
              name="postQualification"
              className="form-control mb-2"
              onChange={handleChange}
            >
              <option value="">Select Post Qualification</option>
              <option value="MD Cardiology">MD Cardiology</option>
              <option value="MD Neurology">MD Neurology</option>
              <option value="MD ENT">MD ENT</option>
              <option value="MD Orthopedics">MD Orthopedics</option>
            </select>

            <input
              className="form-control mb-2"
              name="experience"
              placeholder="Experience (Years)"
              type="number"
              onChange={handleChange}
            />

            <input
              className="form-control mb-2"
              name="consultationFee"
              placeholder="Consultation Fee"
              type="number"
              onChange={handleChange}
            />
          </>
        )}

        {/* Password */}
        <input
          type="password"
          className="form-control mb-2"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <small className="text-muted">
          Password must be 8–15 chars, include uppercase, lowercase,
          number, special (!@#$%), no spaces.
        </small>

        <button className="btn btn-primary w-100 mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
