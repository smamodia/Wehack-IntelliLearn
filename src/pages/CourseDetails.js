// import { useParams } from "react-router-dom";

// const courseMaterials = {
//   1: ["React Hooks", "State Management"],
//   2: ["Express.js", "API Development"],
//   3: ["Supervised Learning", "Neural Networks"]
// };

// const CourseDetails = () => {
//   const { id } = useParams();
//   const materials = courseMaterials[id] || [];

//   return (
//     <div className="p-4">
//       <h1>Course Materials</h1>
//       <ul>
//         {materials.map((material, index) => (
//           <li key={index}>{material}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CourseDetails;
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const courseMaterials = {
  1: ["React Hooks", "State Management"],
  2: ["Express.js", "API Development"],
  3: ["Supervised Learning", "Neural Networks"]
};

const CourseDetails = () => {
  const { id } = useParams();
  const materials = courseMaterials[id] || [];

  return (
    <div className="container mt-4">
      <h1 className="text-center">Course Materials</h1>
      <ul className="list-group">
        {materials.map((material, index) => (
          <li key={index} className="list-group-item">
            {material}
          </li>
        ))}
      </ul>
      <button className="btn btn-success mt-3">Download Materials</button>
    </div>
  );
};

export default CourseDetails;
