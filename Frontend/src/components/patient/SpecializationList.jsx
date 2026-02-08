import React, { useEffect, useState } from "react";
import axios from "axios";

const SpecializationList = ({ onSelect }) => {
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/specializations")
      .then(res => setSpecializations(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ul className="list-group">
      {specializations.map(spec => (
        <li
          key={spec.specializationId}   // ✅ THIS FIXES THE WARNING
          className="list-group-item list-group-item-action"
          style={{ cursor: "pointer" }}
          onClick={() => onSelect(spec)}
        >
          {spec.specializationName}
        </li>
      ))}
    </ul>
  );
};

export default SpecializationList;

// import axios from "axios";
// import { useEffect, useState } from "react";

// function SpecializationList({ onSelect }) {
//   const [specializations, setSpecializations] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/specializations")
//       .then((res) => setSpecializations(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h3>Specializations</h3>
//       <ul>
//         {specializations.map((s) => (
//           <li key={s.id} onClick={() => onSelect(s)}>
//             {s.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

//export default SpecializationList;
