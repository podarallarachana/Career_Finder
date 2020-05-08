import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button, Alert } from "react-bootstrap";
import Pagination from "react-js-pagination";
import CertificationDetails from "./CertificationDetails";
import Spinner from "react-bootstrap/Spinner";

const Certifications = (props) => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const showDetails = (num) => {
    let curr = props.showCertificationDetails;
    if (curr === -1) {
      props.setShowCertificationDetails(num);
    } else {
      props.setShowCertificationDetails(-1);
    }
  };

  const displayCertifications = () => {
    if (props.certifications.certificationsData === undefined) {
      return (
        <div className="certifications">
          <div
            className="row justify-content-center"
            style={{ padding: "40px" }}
          >
            <Spinner animation="grow" variant="primary" />
          </div>
        </div>
      );
    } else if (props.certifications.certificationsData === null) {
      return (
        <div className="certifications">
          <div className="row justify-content-center">
            <div className="col-12">
              <Alert variant="danger">
                <Alert.Heading>Not Available</Alert.Heading>
                <p>
                  Try again, the connection may be weak or your parameters may
                  be too specific.
                </p>
              </Alert>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="certifications">
          {props.showCertificationDetails === -1 ? (
            <Fragment>
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
                {props.certifications.certificationsData.CertList.slice(
                  (activePage - 1) * 50,
                  (activePage - 1) * 50 + 50
                ).map((cert, index) => {
                  return (
                    <div
                      key={cert.Id}
                      className="col-xs-12 col-sm-12 col-md-50 col-lg-4 col-xl-4"
                    >
                      <Card
                        style={{ marginBottom: "15px", borderRadius: "0px" }}
                      >
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
                          <small>
                            <b>{cert.Url}</b>
                          </small>
                          <hr />
                          <small>
                            <b>Description: </b>
                            {cert.Description && cert.Description.length > 100
                              ? cert.Description.substring(0, 100) + "..."
                              : cert.Description}
                          </small>
                          <br />
                          <small>
                            <b>Type: </b>
                            {cert.Type}
                          </small>
                          <br />
                          <small>
                            <b>Organization: </b>
                            {cert.Organization}
                          </small>
                          <br />
                          <br />
                          <div className="row justify-content-center">
                            <Button
                              className="optionsButton"
                              variant="primary btn-xs"
                              onClick={() => showDetails(cert.Id)}
                            >
                              Learn More
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
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
            </Fragment>
          ) : (
            <CertificationDetails
              setShowCertificationDetails={props.setShowCertificationDetails}
              certifications={props.certifications}
              showCertificationDetails={props.showCertificationDetails}
            />
          )}
        </div>
      );
    }
  };

  return <div>{displayCertifications()}</div>;
};

export default Certifications;
