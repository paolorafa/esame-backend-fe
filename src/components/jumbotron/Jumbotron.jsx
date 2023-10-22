import React from "react";
import './jumbotron.css'


function Jumbotron() {
  return (
    <div className="p-5 mb-4 bg-light rounded-3 my-back">
      <div className="container-fluid py-5 ">
        <h1 className="display-5 fw-bold text-white">MyFirst Blog</h1>
        <p className="col-md-8 fs-4 text-white">Benvenuto nel mio primo Blog...</p>
      </div>
    </div>
  );
}

export default Jumbotron;
