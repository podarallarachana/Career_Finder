import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

const Licenses = (props) => {
  const displayLicenses = () => {
    if (props.licenses.licensesData === undefined) {
      return <div>loading</div>;
    } else if (props.licenses.licensesData === null) {
      return <div>sorry, unavailable right now</div>;
    } else {
      return (
        <div className="licenses">
          <Fragment>
            <CardColumns>
              {props.licenses.licensesData.LicenseList.map((license) => {
                return (
                  <Card key={license.ID}>
                    <Card.Body>
                      <h4 className="font-weight-light">{license.Title}</h4>
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

  return <div>{displayLicenses()}</div>;
};

export default Licenses;
