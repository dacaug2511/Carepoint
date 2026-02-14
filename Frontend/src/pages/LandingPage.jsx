import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header"; // sticky navbar
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css"; // service card hover, smooth scroll

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

  // Redirect logged-in users to their dashboard
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "PATIENT") navigate("/patient/dashboard");
      else if (user.role === "DOCTOR") navigate("/doctor/dashboard");
      else if (user.role === "ADMIN") navigate("/admin/dashboard");
    }
  }, [navigate]);

  return (
    <>
      

      {/* ================= TOP BANNER ================= */}
      <div className="container mt-3 mb-4">
        <img
          src="/images/Header.jpeg"
          alt="Trusted Doctors Banner"
          className="img-fluid rounded"
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
        />
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <div id="about" className="container my-5">
        <h2 className="text-center mb-4">About Us</h2>
        <p className="lead text-center mb-3">
          Prescripto is your trusted healthcare partner, connecting patients with highly qualified doctors across multiple specialties.
        </p>
        <p className="text-center mb-3">
          Our mission is to make healthcare <strong>accessible, affordable, and reliable</strong> for everyone. 
          We believe that quality healthcare should never be out of reach, and we strive to bridge the gap between patients and healthcare professionals.
        </p>
        <p className="text-center">
          With our platform, you can easily book appointments, consult doctors online, and maintain your health records securely – all in one place.
        </p>
      </div>

      {/* ================= SERVICES SECTION ================= */}
      <div id="services" className="container my-5">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 service-card">
              <div className="card-body">
                <h5 className="card-title">Online Consultations</h5>
                <p className="card-text">Book video consultations with top doctors from the comfort of your home.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 service-card">
              <div className="card-body">
                <h5 className="card-title">In-Clinic Appointments</h5>
                <p className="card-text">Schedule visits with trusted doctors at nearby clinics and hospitals.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 service-card">
              <div className="card-body">
                <h5 className="card-title">Health Records</h5>
                <p className="card-text">Securely store and access your medical history anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  style={{ height: "260px", objectFit: "cover", borderRadius: "12px" }}
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

      {/* ================= FOOTER BANNER ================= */}
      <div className="container mt-4 mb-5">
        <img
          src="/images/Footerr.jpeg"
          alt="Footer Banner"
          className="img-fluid"
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
        />
      </div>

      {/* ================= CONTACT SECTION BELOW FOOTER ================= */}
      <div id="contact" className="container my-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <form className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Your Name" required />
          </div>
          <div className="col-md-6">
            <input type="email" className="form-control" placeholder="Your Email" required />
          </div>
          <div className="col-12">
            <textarea className="form-control" rows="4" placeholder="Your Message" required></textarea>
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary px-4">Send Message</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LandingPage;