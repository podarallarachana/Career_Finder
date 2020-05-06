import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home">
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6 text-center">
            <div
              className="card"
              style={{
                backgroundColor: "#ed4569",
                padding: "0px 20px",
                border: "5px solid 	#ee5b65",
                color: "#fff",
              }}
            >
              <div className="card-body">
                <h1>
                  <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                  &nbsp;Career Finder
                </h1>
                <small>
                  <b
                    style={{
                      backgroundColor: "white",
                      padding: "5px",
                      borderRadius: "100%",
                      color: "black",
                    }}
                  >
                    &nbsp;1&nbsp;
                  </b>{" "}
                  Find a career.
                </small>
                <br />
                <small>
                  <b>Step 2: </b>Find a career.
                </small>
                <br />
                <small>
                  <b>Step 3: </b>Find a career.
                </small>
                <br />
                <Link to="/login">
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "#ff851f", border: "0px" }}
                  >
                    Login
                  </Button>
                </Link>
                {"  "}
                <Link to="/register">
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "#ff851f", border: "0px" }}
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
