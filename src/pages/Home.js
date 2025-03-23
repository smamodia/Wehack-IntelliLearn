// const Home = () => {
//     return <h1 className="p-4">Welcome to the Learning Platform</h1>;
//   };
  
//   export default Home;
  
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import StudyImage from "../public/study.avif";
// import Navbar from "../components/Navbar";

const Home = () => {
  // <Navbar/>
  return (
    
    <div className="container text-center mt-5">
      <h1 className="p-4 bg-primary text-white rounded">Welcome to the Learning Platform</h1>
      <img
        src="/study.avif"
        alt="study"
        className="img-fluid rounded shadow-lg my-4"
      />
      <p className="lead text-muted">
        Start your learning journey with our interactive courses and resources.
      </p>
    </div>
  );
};

export default Home;
