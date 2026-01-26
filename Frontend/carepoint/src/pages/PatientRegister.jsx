import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPatient } from "../services/api";
import { toast } from "react-toastify";

const PatientRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // USER TABLE
    uname: "",
    firstname: "",
    lastname: "",
    password: "",
    phone: "",
    email: "",
    address: "",

    // PATIENT TABLE
    gender: "",
    dob: "",
    emergency_contact: "",
    allergy: "",
    disease: "",
    blood_group: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerPatient(form);

      toast.success("Patient registered successfully");
      navigate("/login");   // ✅ redirect to login

    } catch (err) {
      console.error(err);
      toast.error("Patient registration failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h4 className="text-center mb-3">Patient Registration</h4>

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" name="uname" placeholder="Username" onChange={handleChange} required />
          <input className="form-control mb-2" name="firstname" placeholder="First Name" onChange={handleChange} required />
          <input className="form-control mb-2" name="lastname" placeholder="Last Name" onChange={handleChange} required />
          <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-2" name="phone" placeholder="Phone" onChange={handleChange} required />
          <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input className="form-control mb-2" name="address" placeholder="Address" onChange={handleChange} />

          <select className="form-control mb-2" name="gender" onChange={handleChange}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input className="form-control mb-2" type="date" name="dob" onChange={handleChange} />
          <input className="form-control mb-2" name="emergency_contact" placeholder="Emergency Contact" onChange={handleChange} required />
          <input className="form-control mb-2" name="blood_group" placeholder="Blood Group" onChange={handleChange} />
          <input className="form-control mb-2" name="allergy" placeholder="Allergy" onChange={handleChange} />
          <input className="form-control mb-3" name="disease" placeholder="Disease" onChange={handleChange} />

          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegister;
