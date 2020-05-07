import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import { Alert, Button, Spinner } from "react-bootstrap";

const LicenseDetails = (props) => {
  const displayData = () => {
    var license = props.licenses.licensesData.LicenseList.find(
      (license) => license.ID === props.showLicenseDetails
    );
    return (
      <Card style={{ borderRadius: "0px", marginTop: "15px" }}>
        <Card.Body
          style={{
            padding: "30px",
          }}
        >
          <h1>{license.Title}</h1>
          <small>
            <b>Valid in&nbsp;{license.State}</b>
          </small>
          <hr />
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <p>
                <b>Descriptions</b>
                {license.Description}
              </p>
              <br />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <p>
                <b>Agency Info</b>
              </p>
              <p>
                Name:&nbsp;
                {license.LicenseAgency.Name}
              </p>
              <p>
                Address:&nbsp;
                {license.LicenseAgency.Address}
                <br />
                {license.LicenseAgency.City},&nbsp;
                {license.LicenseAgency.State}&nbsp;{license.LicenseAgency.Zip}
              </p>
              <p>
                Website:&nbsp;
                {license.LicenseAgency.Url}
              </p>
              <p>
                Email:&nbsp;
                {license.LicenseAgency.Email}
              </p>
              <br />
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="licenses">
      <div className="row justify-content-center">
        <Button
          variant="primary btn-xs"
          onClick={() => props.setShowLicenseDetails(-1)}
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

export default LicenseDetails;
