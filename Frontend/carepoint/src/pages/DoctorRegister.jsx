import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerDoctor } from "../services/api";
import { validatePassword } from "../utils/passwordValidator";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    uname: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    aadhaar: "",
    address: "",
    specializationId: "",
    baseQualification: "",
    postQualification: "",
    experience: "",
    consultationFee: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "uname":
        if (!value) error = "Username required";
        else if (value.length < 4) error = "Min 4 characters";
        break;

      case "firstName":
      case "lastName":
        if (!/^[A-Za-z]+$/.test(value))
          error = "Only alphabets allowed";
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email";
        break;

      case "phone":
        if (!/^\d{10}$/.test(value))
          error = "Phone must be 10 digits";
        break;

      case "aadhaar":
        if (!/^\d{12}$/.test(value))
          error = "Aadhaar must be 12 digits";
        break;

      case "experience":
        if (value < 0 || value > 60)
          error = "Experience must be 0–60 years";
        break;

      case "consultationFee":
        if (value <= 0) error = "Fee must be positive";
        break;

      case "password":
        error = validatePassword(value) || "";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((e) => e)) {
      toast.error("Fix validation errors");
      return;
    }

    try {
      await registerDoctor(form);
      toast.success("Doctor Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    }
  };

  const errorText = (field) =>
    errors[field] && <small className="text-danger">{errors[field]}</small>;

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
        <h4 className="text-center mb-4"><b>Doctor Registration</b></h4>

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-1" name="uname" placeholder="Username" onChange={handleChange} />
          {errorText("uname")}

          <input className="form-control mb-1" name="firstName" placeholder="First Name" onChange={handleChange} />
          {errorText("firstName")}

          <input className="form-control mb-1" name="lastName" placeholder="Last Name" onChange={handleChange} />
          {errorText("lastName")}

          <input type="date" className="form-control mb-1" name="dob" onChange={handleChange} />

          <input className="form-control mb-1" name="phone" placeholder="Phone" onChange={handleChange} />
          {errorText("phone")}

          <input className="form-control mb-1" name="email" placeholder="Email" onChange={handleChange} />
          {errorText("email")}

          <input className="form-control mb-1" name="aadhaar" placeholder="Aadhaar" onChange={handleChange} />
          {errorText("aadhaar")}

          <select
            className="form-control"
            value={form.baseQualification}
            onChange={(e) =>
              setForm({ ...form, baseQualification: e.target.value })
            }
          >
            <option value="">Base Qualification</option>
            <option>MBBS</option>
            <option>BHMS</option>
            <option>BAMS</option>
          </select>
<br></br>
          <select
            className="form-control"
            value={form.postQualification}
            onChange={(e) =>
              setForm({ ...form, postQualification: e.target.value })
            }
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
<br></br>



          <select className="form-control mb-2" name="specializationId" onChange={(e) =>
    handleChange({
      target: {
        name: "specializationId",
        value: Number(e.target.value)
      }
    })
  }>
            <option value="">Select Specialization</option>
            <option value="1">Cardiology</option>
            <option value="2">Neurology</option>
            <option value="3">ENT</option>
            <option value="4">Dermatology</option>
          </select>
  <br></br>
          <textarea
            className="form-control"
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
          <br></br>
          <input className="form-control mb-1" name="experience" placeholder="Experience" onChange={handleChange} />
          {errorText("experience")}

          <input className="form-control mb-1" name="consultationFee" placeholder="Fee" onChange={handleChange} />
          {errorText("consultationFee")}

          <input type="password" className="form-control mb-2" name="password" placeholder="Password" onChange={handleChange} />
          {errorText("password")}

          <button className="btn btn-primary w-100">Register Doctor</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;
