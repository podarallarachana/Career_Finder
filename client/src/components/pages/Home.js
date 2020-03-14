import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Row } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home">
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6 text-center">
            <div
              className="card"
              style={{
                border: "0px",
                backgroundColor: "#f5631f",
                padding: "0px 20px",
                border: "5px solid 	#ff7e26",
                color: "#fff"
                // borderRadius: "30px"
                // boxShadow: " 0px 3px 3px 0px rgba(0,0,0,0.25)"
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
