import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

const Certifications = (props) => {
  const displayCertifications = () => {
    if (props.certifications.certificationsData === undefined) {
      return <div>loading</div>;
    } else if (props.certifications.certificationsData === null) {
      return <div>sorry, unavailable right now</div>;
    } else {
      return (
        <div className="certifications">
          <Fragment>
            <CardColumns>
              {props.certifications.certificationsData.CertList.map((cert) => {
                return (
                  <Card key={cert.Id}>
                    <Card.Body>
                      <h4 className="font-weight-light">{cert.Name}</h4>
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </Fragment>
        </div>
      );
    }
  };

  return <div>{displayCertifications()}</div>;
};

export default Certifications;
