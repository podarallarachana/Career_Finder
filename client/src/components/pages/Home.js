import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Career Finder</h1>
          <p className="lead">Find the perfect career for you!</p>
          <div className="buttons">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
