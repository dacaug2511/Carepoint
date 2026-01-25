import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerDoctor } from "../services/api";
import { validatePassword } from "../utils/passwordValidator";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorRegister = () => {
  const navigate = useNavigate(); // ✅ added

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    aadhaar: "",
    address: "",
    baseQualification: "",
    postQualification: "",
    experience: "",
    consultationFee: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validatePassword(form.password);
    if (err) return toast.error(err);

    try {
      await registerDoctor(form);

      toast.success("Doctor Registered Successfully");
      navigate("/login"); // ✅ redirect to login

    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/DocRegBG.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* overlay */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "30px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
          color: "white"
        }}
      >
        <h4 className="text-center mb-4">
          <b>Doctor Registration</b>
        </h4>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />

          {/* Gender */}
          <div className="mb-2">
            <label className="me-3">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
              />{" "}
              Male
            </label>

            <label className="me-3">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
              />{" "}
              Female
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={handleChange}
              />{" "}
              Other
            </label>
          </div>

          {/* DOB */}
          <input
            type="date"
            className="form-control mb-2"
            name="dob"
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="aadhaar"
            placeholder="Aadhaar Number (12 digits)"
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <select
            className="form-control mb-2"
            name="baseQualification"
            onChange={handleChange}
          >
            <option value="">Base Qualification</option>
            <option>MBBS</option>
            <option>BHMS</option>
            <option>BAMS</option>
          </select>

          <select
            className="form-control mb-2"
            name="postQualification"
            onChange={handleChange}
          >
            <option value="">Post Qualification</option>
            <option>MD Cardiology</option>
            <option>MD Neurology</option>
            <option>MD ENT</option>
            <option>MD Dermatology</option>
            <option>MD Gynecology</option>
            <option>MD Pediatrics</option>
            <option>MS Orthopedics</option>
          </select>

          <input
            className="form-control mb-2"
            name="experience"
            placeholder="Experience (years)"
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="consultationFee"
            placeholder="Consultation Fee"
            onChange={handleChange}
          />

          <input
            type="password"
            className="form-control mb-3"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">
            Register Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;
