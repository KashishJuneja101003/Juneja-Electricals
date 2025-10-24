import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex h-135 mb-0 items-center justify-center" style={{ background: "linear-gradient(45deg, #27548a, #1dd1a1)" }}>
      <div
        
        className="flex flex-col justify-center items-center min-h-[60vh] gradient container"
      >
        <h1>404</h1>
        <h2 className="text-xl">Oops, Page Not Found‼️</h2>
        <Link to="/">
          <button className="btn">Go Back 👈</button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
