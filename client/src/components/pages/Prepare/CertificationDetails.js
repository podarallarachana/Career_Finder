import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import { Alert, Button, Spinner } from "react-bootstrap";

const CertificationDetails = (props) => {
  const displayDetails = (details) => {
    return (
      <Fragment>
        {details.map((detail) => {
          return (
            <p key={detail.Name}>
              {detail.Name}&nbsp;<b>{detail.Value}</b>
            </p>
          );
        })}
      </Fragment>
    );
  };

  const displayAgencies = (agencies) => {
    return (
      <Fragment>
        {agencies.map((agency) => {
          return <p key={agency.Name}>{agency.Name}</p>;
        })}
      </Fragment>
    );
  };

  const displayData = () => {
    if (props.certifications.certificationsData === undefined) {
      return (
        <div className="Certifications">
          <div className="row justify-content-center">
            <Spinner animation="grow" />
          </div>
        </div>
      );
    } else if (props.certifications.certificationsData === null) {
      return (
        <div className="Certifications">
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
      var cert = props.certifications.certificationsData.CertList.find(
        (cert) => cert.Id === props.showCertificationDetails
      );
      return (
        <Card style={{ borderRadius: "0px", marginTop: "15px" }}>
          <Card.Body
            style={{
              padding: "30px",
            }}
          >
            <h1>{cert.Name}</h1>
            <small>
              <b>
                <i className="fa fa-external-link" aria-hidden="true"></i>
                &nbsp;&nbsp;
                {cert.Url}
              </b>
              <br />
              Type:&nbsp;{cert.Type}
            </small>
            <hr />
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <p>
                  <b>Details</b>
                </p>
                {cert.CertDetailList !== null ? (
                  displayDetails(cert.CertDetailList)
                ) : (
                  <p>(no details)</p>
                )}
                <br />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <p>
                  <b>Organization Info</b>
                </p>
                <p>
                  Name:&nbsp;
                  {cert.Organization}
                </p>
                <p>
                  Address:&nbsp;
                  {cert.OrganizationAddress}
                </p>
                <p>
                  Website:&nbsp;
                  {cert.OrganizationUrl}
                </p>
                <br />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <p>
                  <b>Accredited Agencies List</b>
                </p>
                {cert.CertAccredAgencyList !== null ? (
                  displayAgencies(cert.CertAccredAgencyList)
                ) : (
                  <p>(no agencies)</p>
                )}
                <br />
              </div>
            </div>
          </Card.Body>
        </Card>
      );
    }
  };

  return (
    <div className="certifications">
      <div className="row justify-content-center">
        <Button
          variant="primary btn-xs"
          onClick={() => props.setShowCertificationDetails(-1)}
          className="optionsButton"
        >
          <i
            className="fa fa-chevron-circle-left"
            aria-hidden="true"
            style={{ color: "white" }}
          ></i>
          &nbsp;&nbsp;Go Back
        </Button>
      </div>
      {displayData()}
    </div>
  );
};

export default CertificationDetails;
