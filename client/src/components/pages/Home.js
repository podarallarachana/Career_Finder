import React from "react";

const Home = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Career Finder</h1>
          <p className="lead">Find the perfect career for you!</p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">
              Register
            </a>
            <a href="login.html" className="btn btn-light">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
