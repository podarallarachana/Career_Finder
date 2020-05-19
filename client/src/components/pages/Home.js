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
                backgroundColor: "white",
                padding: "0px 20px",
                // border: "5px solid 	#ee5b65",
                color: "#1e3163",
                borderRadius: "0px",
              }}
            >
              <div className="card-body">
                <h1>
                  <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                  &nbsp;Career Finder
                </h1>
                <Link to="/find">
                  <Button
                    variant="outline-primary"
                    style={{ borderRadius: "0px", marginTop: "15px" }}
                  >
                    <small>
                      <b>1.&nbsp;</b>Find a Career
                    </small>
                  </Button>
                </Link>
                <br />
                <Link to="/explore/11-9013.03">
                  <Button
                    variant="primary"
                    style={{ borderRadius: "0px", marginTop: "15px" }}
                  >
                    <small>
                      <b>2.&nbsp;</b>Explore the Career
                    </small>
                  </Button>
                </Link>
                <br />
                <Link to="/prepare">
                  <Button
                    variant="outline-primary"
                    style={{ borderRadius: "0px", marginTop: "15px" }}
                  >
                    <small>
                      <b>3.&nbsp;</b>Prepare for the Career
                    </small>
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
