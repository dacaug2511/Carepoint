import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const doctors = [
  { id: 1, name: "Dr. John Doe", specialization: "Cardiologist", fee: 1600, image: "/images/image2.png" },
  { id: 2, name: "Dr. Sarah Lee", specialization: "Neurologist", fee: 700, image: "/images/image2.webp" },
  { id: 3, name: "Dr. Mike Wilson", specialization: "ENT Specialist", fee: 500, image: "/images/image3.webp" },
  { id: 4, name: "Dr. Emma Brown", specialization: "Orthopedic", fee: 800, image: "/images/image5.webp" },
  { id: 5, name: "Dr. Raj Patel", specialization: "Dermatologist", fee: 400, image: "/images/image.webp" },
  { id: 6, name: "Dr. Anjali Sharma", specialization: "Gynecologist", fee: 650, image: "/images/image4.webp" },
  { id: 7, name: "Dr. David Miller", specialization: "Psychiatrist", fee: 900, image: "/images/image7.webp" },
  { id: 8, name: "Dr. Neha Verma", specialization: "Pediatrician", fee: 550, image: "/images/image6.webp" },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ================= NAVBAR ================= */}
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <span className="navbar-brand fw-bold text-primary">
          🏥 CarePoint
        </span>

        <div className="ms-auto">
          <button className="btn btn-link me-3">About</button>
          <button className="btn btn-link me-3">Services</button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          
        </div>
      </nav> */}

      {/* ================= DOCTOR GRID ================= */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Find Trusted Doctors</h2>

        <div className="row">
          {doctors.map((doc) => (
            <div key={doc.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={doc.image}
                  className="card-img-top"
                  alt={doc.name}
                  style={{
                    height: "260px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />

                <div className="card-body text-center">
                  <h6 className="card-title">{doc.name}</h6>
                  <p className="text-muted mb-1">{doc.specialization}</p>
                  <p className="fw-bold">₹ {doc.fee}</p>

                  <button
                    className="btn btn-outline-primary btn-sm w-75"
                    onClick={() => navigate("/login")}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
