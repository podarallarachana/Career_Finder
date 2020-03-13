import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Row } from "react-bootstrap";

const Home = () => {
  return (
    <header className="masthead">
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 text-center">
            <div
              className="card"
              style={{
                border: "0px",
                boxShadow: " 0px 3px 3px 0px rgba(0,0,0,0.25)"
              }}
            >
              <div className="card-body">
                <h1 className="font-weight-light">
                  <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                  &nbsp;Career Finder
                </h1>
                <p className="lead">
                  Find the perfect career for you. Sign up now to access more
                  interactive features!
                </p>
                <Link to="/login">
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "#cbf4fa", border: "0px" }}
                  >
                    Login
                  </Button>
                </Link>
                {"  "}
                <Link to="/register">
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "#00bcd5", border: "0px" }}
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
