import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPatient } from "../services/api";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const PatientRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    uname: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    dob: "",
    aadhaar: "",
    emergencyContact: "",
    allergy: "",
    disease: "",
    bloodGroup: ""
  });

  const [errors, setErrors] = useState({});

  // ---------- REGEX ----------
  const regex = {
    name: /^[A-Za-z]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\d{10}$/,
    aadhaar: /^\d{12}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/
  };

  // ---------- VALIDATION ----------
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "uname":
        if (value.length < 4)
          error = "Username must be at least 4 characters";
        break;

      case "firstName":
      case "lastName":
        if (!regex.name.test(value))
          error = "Only alphabets allowed";
        break;

      case "email":
        if (!regex.email.test(value))
          error = "Invalid email format";
        break;

      case "phone":
      case "emergencyContact":
        if (!regex.phone.test(value))
          error = "Must contain exactly 10 digits";
        break;

      case "aadhaar":
        if (!regex.aadhaar.test(value))
          error = "Aadhaar must contain exactly 12 digits";
        break;

      case "dob":
        if (new Date(value) > new Date())
          error = "Date of birth cannot be a future date";
        break;

      case "password":
        if (!regex.password.test(value))
          error =
            "8-15 chars, uppercase, lowercase, number & special character required";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ---------- CHANGE ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((err) => err)) {
      toast.error("Please fix validation errors");
      return;
    }

    try {
      await registerPatient(form);
      toast.success("Patient registered successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  const showError = (field) => (
  <div style={{ minHeight: "18px" }}>
    {errors[field] && (
      <small className="text-danger">{errors[field]}</small>
    )}
  </div>
);


  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h4 className="text-center mb-3">Patient Registration</h4>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input className="form-control mb-1" name="uname" onChange={handleChange} />
          {showError("uname")}

          <label>First Name</label>
          <input className="form-control mb-1" name="firstName" onChange={handleChange} />
          {showError("firstName")}

          <label>Last Name</label>
          <input className="form-control mb-1" name="lastName" onChange={handleChange} />
          {showError("lastName")}

          <label>Email</label>
          <input className="form-control mb-1" name="email" onChange={handleChange} />
          {showError("email")}

          <label>Phone Number</label>
          <input className="form-control mb-1" name="phone" onChange={handleChange} />
          {showError("phone")}

          <label>aadhaar Number</label>
          <input className="form-control mb-1" name="aadhaar" onChange={handleChange} />
          {showError("aadhaar")}

          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control mb-1"
            name="dob"
            max={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
          />
          {showError("dob")}

          <label>Gender</label>
          <select className="form-control mb-1" name="gender" onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>

          <label>Address</label>
          <input className="form-control mb-1" name="address" onChange={handleChange} />

          <label>Password</label>
          <input
            type="password"
            className="form-control mb-1"
            name="password"
            onChange={handleChange}
          />
          {showError("password")}

          <label>Emergency Contact</label>
          <input className="form-control mb-1" name="emergencyContact" onChange={handleChange} />
          {showError("emergencyContact")}

          <label>Blood Group</label>
          <input className="form-control mb-1" name="bloodGroup" onChange={handleChange} />

          <label>Allergy</label>
          <input className="form-control mb-1" name="allergy" onChange={handleChange} />

          <label>Disease</label>
          <input className="form-control mb-3" name="disease" onChange={handleChange} />

          <button className="btn btn-primary w-100">
            Register Patient
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
