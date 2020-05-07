import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import Pagination from "react-js-pagination";
import { Button } from "react-bootstrap";
import LicenseDetails from "./LicenseDetails";

const Licenses = (props) => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const showDetails = (num) => {
    let curr = props.showLicenseDetails;
    if (curr === -1) {
      props.setShowLicenseDetails(num);
    } else {
      props.setShowLicenseDetails(-1);
    }
  };

  const displayLicenses = () => {
    if (props.licenses.licensesData === undefined) {
      return <div>loading</div>;
    } else if (props.licenses.licensesData === null) {
      return <div>sorry, unavailable right now</div>;
    } else {
      return (
        <div className="licenses">
          {props.showLicenseDetails === -1 ? (
            <Fragment>
              <div className="row justify-content-center">
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={activePage}
                  itemsCountPerPage={6}
                  totalItemsCount={
                    props.licenses.licensesData.LicenseList.length
                  }
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                />
              </div>
              <div className="row">
                {props.licenses.licensesData.LicenseList.slice(
                  (activePage - 1) * 6,
                  (activePage - 1) * 6 + 6
                ).map((license, index) => {
                  return (
                    <div
                      key={license.ID}
                      className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
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
                              {index + 1 + (activePage - 1) * 6}
                            </span>
                            . {license.Title}
                          </h4>
                          <small>
                            <b>Valid in&nbsp;{license.State}</b>
                          </small>
                          <hr />
                          <small>
                            <b>Description: </b>
                            {license.Description &&
                            license.Description.length > 100
                              ? license.Description.substring(0, 100) + "..."
                              : license.Description}
                          </small>
                          <br />
                          <small>
                            <b>Agency: </b>
                            {license.LicenseAgency.Name}
                          </small>
                          <br />
                          <br />
                          <div className="row justify-content-center">
                            <Button
                              className="optionsButton"
                              variant="primary btn-xs"
                              onClick={() => showDetails(license.ID)}
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
                  itemsCountPerPage={6}
                  totalItemsCount={
                    props.licenses.licensesData.LicenseList.length
                  }
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                />
              </div>
            </Fragment>
          ) : (
            <LicenseDetails
              licenses={props.licenses}
              showLicenseDetails={props.showLicenseDetails}
              setShowLicenseDetails={props.setShowLicenseDetails}
            />
          )}
        </div>
      );
    }
  };

  return <div>{displayLicenses()}</div>;
};

export default Licenses;
