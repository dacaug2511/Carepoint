import React from "react";

const DoctorCard = ({ doctor, onSelect }) => {
  if (!doctor || !doctor.user) return null; // 🛡 safety

  return (
    <div
      className="card mb-3 shadow-sm"
      style={{ cursor: "pointer" }}
      onClick={() => onSelect(doctor)}
    >
      <div className="card-body">
        <h5 className="card-title">
          Dr. {doctor.user.firstName} {doctor.user.lastName}
        </h5>

        <p className="card-text">
          Email: {doctor.user.email}
        </p>

        <p className="card-text">
          Specialization: {doctor.specialization.specializationName}
        </p>

        <p className="card-text">
          Experience: {doctor.experience} years
        </p>

        <p className="card-text">
          Fee: ₹{doctor.consultationFee}
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;



// import React from "react";

// const DoctorCard = ({ doctor }) => {
//   return (
//     <div className="card mb-3 shadow-sm">
//       <div className="card-body">

//         <h5 className="card-title">
//           Dr. {doctor.user.firstName} {doctor.user.lastName}
//         </h5>

//         <p className="card-text">
//           Email: {doctor.user.email}
//         </p>

//         <p className="card-text">
//           Specialization: {doctor.specialization.specializationName}
//         </p>

//         <p className="card-text">
//           Experience: {doctor.experience} years
//         </p>

//         <p className="card-text">
//           Fee: ₹{doctor.consultationFee}
//         </p>

//       </div>
//     </div>
//   );
// };

// export default DoctorCard;



// // import React from "react";

// // const DoctorCard = ({ doctor }) => {
// //   return (
// //     <div className="card mb-3 shadow-sm">
// //       <div className="card-body">

// //         <h5 className="card-title">
// //           Dr. {doctor.name || doctor.userName || "N/A"}
// //         </h5>

// //         <p className="card-text">
// //           Email: {doctor.email || doctor.userEmail || "N/A"}
// //         </p>

// //         <p className="card-text">
// //           Specialization: {doctor.specialization?.specializationName}
// //         </p>

// //         <p className="card-text">
// //           Experience: {doctor.experience || doctor.yearsOfExperience || 0} years
// //         </p>

// //       </div>
// //     </div>
// //   );
// // };

// // export default DoctorCard;
