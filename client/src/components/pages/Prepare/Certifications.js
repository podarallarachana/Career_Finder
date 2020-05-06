import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Pagination from "react-js-pagination";

const Certifications = (props) => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const getColors = (number) => {
    var colors = [
      { light: "#fba465", medium: "#f86e51", dark: "#ee3e38" }, //orange
      { light: "#c0e6ff", medium: "#7cc7ff", dark: "#5aaafa" }, //blue
      { light: "#b4e051", medium: "#8cd211", dark: "#5aa700" }, //green
    ];
    var color = colors[0];

    if ("1470".indexOf(number[number.length - 1].toLowerCase()) > -1) {
      color = colors[0];
    } else if ("258".indexOf(number[number.length - 1].toLowerCase()) > -1) {
      color = colors[1];
    } else if ("369".indexOf(number[number.length - 1].toLowerCase()) > -1) {
      color = colors[2];
    }
    return color;
  };

  const displayDescription = (description) => {
    if (description === null || description === undefined) {
      return null;
    } else if (description.length < 150) {
      return description;
    } else {
      return description.substring(0, 147) + "...";
    }
  };

  const displayCertifications = () => {
    if (props.certifications.certificationsData === undefined) {
      return <div>loading</div>;
    } else if (props.certifications.certificationsData === null) {
      return <div>sorry, unavailable right now</div>;
    } else {
      return (
        <div className="certifications">
          <br />
          <div className="row justify-content-center">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={activePage}
              itemsCountPerPage={50}
              totalItemsCount={
                props.certifications.certificationsData.CertList.length
              }
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
          <div className="row">
            {props.certifications.certificationsData.CertList.map(
              (cert, index) => {
                var color = getColors(index.toString());
                return (
                  <div
                    key={cert.Id}
                    className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
                  >
                    <Card style={{ marginBottom: "15px", border: "0px" }}>
                      <Card.Body
                        style={{
                          padding: "30px",
                        }}
                      >
                        <h4>
                          <span className="font-weight-light">
                            {index + 1 + (activePage - 1) * 50}
                          </span>
                          . {cert.Name}
                        </h4>
                        <small>{cert.Url}</small>
                        <hr />
                        <small>
                          <b>
                            <i
                              className="fa fa-circle"
                              aria-hidden="true"
                              style={{ color: color.light }}
                            ></i>{" "}
                            Description:{" "}
                          </b>
                          {displayDescription(cert.Description)}
                        </small>
                        <br />
                        <small>
                          <b>
                            <i
                              className="fa fa-circle"
                              aria-hidden="true"
                              style={{ color: color.medium }}
                            ></i>
                            &nbsp; Type:&nbsp;
                          </b>
                          {cert.Type}
                        </small>
                        <br />
                        <small>
                          <b>
                            <i
                              className="fa fa-circle"
                              aria-hidden="true"
                              style={{ color: color.dark }}
                            ></i>
                            &nbsp; Organization:{" "}
                          </b>
                          {cert.Organization}
                        </small>
                        <br />
                        <br />
                        <div className="row justify-content-center">
                          <Button
                            className="optionsButton"
                            variant="primary btn-xs"
                            style={{
                              border: "0px",
                              outline: "0px",
                              backgroundColor: color.light,
                              color: "white",
                            }}
                          >
                            Learn More
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              }
            )}
          </div>
          <div className="row justify-content-center">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={activePage}
              itemsCountPerPage={50}
              totalItemsCount={
                props.certifications.certificationsData.CertList.length
              }
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
        </div>
      );
    }
  };

  return <div>{displayCertifications()}</div>;
};

export default Certifications;
