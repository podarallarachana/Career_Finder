import React from "react";
import Card from "react-bootstrap/Card";
import { Alert, Button, Spinner } from "react-bootstrap";

const CertificationDetails = (props) => {
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
            {/* <small>
              {cert.Address}, <br />
              {cert.City}, {cert.StateAbbr}&nbsp;{cert.Zip}
              <br />
              <b>
                <i className="fa fa-external-link" aria-hidden="true"></i>
                &nbsp;&nbsp;
                {cert.certUrl}
              </b>
              <br />
              <b>
                <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;
                {formatPhoneNumber(cert.Phone)}
              </b>
            </small>
            <hr />
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <p>
                  <b>General Info</b>
                </p>
                <p>
                  Acceptance Rate:&nbsp;
                  {displayProperty(
                    cert.ID,
                    "latest.admissions.admission_rate.consumer_rate"
                  )}
                </p>
              </div>
            </div> */}
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
