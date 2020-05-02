import React, { Fragment, useState } from "react";
import data from "../Explore/Data.json";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Alert, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import { LinkContainer } from "react-router-bootstrap";
import Pagination from "react-js-pagination";
import Jumbotron from "react-bootstrap/Jumbotron";

const Filter = (props) => {
  const [filterText, setFilterText] = useState("architect");
  const [activePage, setActivePage] = useState(1);
  let textInput = React.createRef();

  const filterUpdate = () => {
    textInput.current.focus();
    setFilterText(textInput.current.value);
  };

  const updateActives = (code) => {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].CareerPathway.length; j++) {
        for (var z = 0; z < data[i].CareerPathway[j].Jobs.length; z++) {
          if (data[i].CareerPathway[j].Jobs[z].Code === code) {
            props.updateActives(
              data[i].CareerCluster,
              data[i].CareerPathway[j].Pathway,
              code
            );
            return;
          }
        }
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const displayOccupations = () => {
    var tmp = [];
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].CareerPathway.length; j++) {
        for (var z = 0; z < data[i].CareerPathway[j].Jobs.length; z++) {
          tmp.push({
            occupation: data[i].CareerPathway[j].Jobs[z],
            pathway: data[i].CareerPathway[j].Pathway,
            cluster: data[i].CareerCluster,
          });
        }
      }
    }

    tmp = tmp.filter((occupation) =>
      occupation.occupation.Occupation.toLowerCase().includes(
        filterText.toLowerCase()
      )
    );

    var arr = tmp;
    if (tmp.length > 100) {
      arr = tmp.slice((activePage - 1) * 100, (activePage - 1) * 100 + 100);
    }

    var colors = ["#f86e51", "#fba465", "#7cc7ff", "#5aaafa"];

    return (
      <Fragment>
        {tmp.length === 0 ? (
          <Alert variant="warning">
            <Alert.Heading>No Occupations Found!</Alert.Heading>
            <p>Broaden your filter or use the keyword search!</p>
          </Alert>
        ) : (
          <Fragment>
            <div className="row justify-content-center">
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={100}
                totalItemsCount={tmp.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              />
            </div>
            <CardColumns>
              {arr.map((occupation) => {
                var color = colors[0];
                if (
                  "etaoin".indexOf(
                    occupation.occupation.Occupation.charAt(0).toLowerCase()
                  ) > -1
                ) {
                  color = colors[0];
                } else if (
                  "srhdlu".indexOf(
                    occupation.occupation.Occupation.charAt(0).toLowerCase()
                  ) > -1
                ) {
                  color = colors[1];
                } else if (
                  "cmfywg".indexOf(
                    occupation.occupation.Occupation.charAt(0).toLowerCase()
                  ) > -1
                ) {
                  color = colors[2];
                } else {
                  color = colors[3];
                }
                return (
                  <LinkContainer
                    key={occupation.occupation.Code}
                    to={"/explore/" + occupation.occupation.Code}
                    style={{ border: "0px", outline: "0px" }}
                  >
                    <Card onClick={() => updateActives(occupation.Code)}>
                      <Card.Body
                        style={{
                          backgroundColor: color,
                          color: "white",
                          padding: "30px",
                        }}
                      >
                        <h4> {occupation.occupation.Occupation}</h4>
                        <small>{occupation.occupation.Description}</small>
                        <br />
                        <br />
                        <Button
                          style={{
                            display: "block",
                            margin: "0 auto",
                          }}
                          variant="outline-light btn-xs"
                          className="optionsButton"
                        >
                          Learn More
                        </Button>
                      </Card.Body>
                      <Button
                        variant="light"
                        style={{
                          borderRadius: "0px",
                          width: "100%",
                          backgroundColor: "white",
                          padding: "30px",
                        }}
                      >
                        <small>
                          <b>Education: </b>
                          {occupation.occupation.Education}
                        </small>
                        <br />
                        <small>
                          <b>Salary: </b>$
                          {occupation.occupation.Salary.toString().replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                        </small>
                      </Button>
                    </Card>
                  </LinkContainer>
                );
              })}
            </CardColumns>
            <div className="row justify-content-center">
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={100}
                totalItemsCount={tmp.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              />
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };

  return (
    <div>
      <Jumbotron className="filterheader">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label
                htmlFor="location"
                style={{
                  paddingLeft: "40px",
                  paddingRight: "40px",
                  backgroundColor: "white",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  marginBottom: "0px",
                }}
              >
                <h1 style={{ color: "#f2c246" }}>
                  <b>
                    <i class="fa fa-filter" aria-hidden="true"></i>&nbsp;FILTER{" "}
                  </b>
                </h1>
                <p style={{ color: "#f2c246" }}>
                  <b>Instructions: </b>
                  Have an occupation in mind? Find it using the filter tool and
                  click the link to visit the profile and learn more about the
                  occupation.
                </p>
                <h6 className="font-weight-light">
                  <i
                    class="fa fa-chevron-circle-right"
                    aria-hidden="true"
                    style={{ color: "#fba465" }}
                  ></i>
                  &nbsp;nurse, surgeon, architect
                </h6>
              </label>
              <InputGroup style={{ padding: "0px", margin: "0px" }}>
                <FormControl
                  style={{
                    borderRadius: "0px",
                    border: "0px",
                    backgroundColor: "#ee5847",
                    color: "white",
                    width: "100%",
                    height: "70px",
                  }}
                  type="text"
                  ref={textInput}
                  onChange={filterUpdate}
                  value={filterText}
                  id="search_bar"
                />
              </InputGroup>
            </Form>
          </div>
        </div>
      </Jumbotron>
      <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
        {displayOccupations()}
      </div>
    </div>
  );
};

export default Filter;
