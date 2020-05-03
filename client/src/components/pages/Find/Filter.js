import React, { Fragment, useState } from "react";
import data from "../Explore/Data.json";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Alert, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
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
    if (description.length < 150) {
      return description;
    } else {
      return description.substring(0, 147) + "...";
    }
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
    if (tmp.length > 50) {
      arr = tmp.slice((activePage - 1) * 50, (activePage - 1) * 50 + 50);
    }

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
                itemsCountPerPage={50}
                totalItemsCount={tmp.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              />
            </div>
            <div className="row">
              {arr.map((occupation, index) => {
                var color = getColors(index.toString());
                return (
                  <div
                    key={occupation.occupation.Code}
                    className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
                  >
                    <Card
                      onClick={() => updateActives(occupation.Code)}
                      style={{ marginBottom: "15px", border: "0px" }}
                    >
                      <Card.Body
                        style={{
                          padding: "30px",
                        }}
                      >
                        <h4>
                          <span className="font-weight-light">{index + 1}</span>
                          . {occupation.occupation.Occupation}
                        </h4>
                        <small>
                          {occupation.pathway}, {occupation.cluster}{" "}
                        </small>
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
                          {displayDescription(
                            occupation.occupation.Description
                          )}
                        </small>
                        <br />
                        <small>
                          <b>
                            <i
                              className="fa fa-circle"
                              aria-hidden="true"
                              style={{ color: color.medium }}
                            ></i>{" "}
                            Education:{" "}
                          </b>
                          {occupation.occupation.Education}
                        </small>
                        <br />
                        <small>
                          <b>
                            <i
                              className="fa fa-circle"
                              aria-hidden="true"
                              style={{ color: color.dark }}
                            ></i>{" "}
                            Salary:{" "}
                          </b>
                          $
                          {occupation.occupation.Salary.toString().replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                        </small>
                        <br />
                        <br />
                        <div className="row justify-content-center">
                          <LinkContainer
                            to={"/explore/" + occupation.occupation.Code}
                            style={{
                              border: "0px",
                              outline: "0px",
                              backgroundColor: color.light,
                              color: "white",
                            }}
                          >
                            <Button
                              className="optionsButton"
                              variant="primary btn-xs"
                              style={{
                                border: "0px",
                              }}
                            >
                              Learn More
                            </Button>
                          </LinkContainer>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
            <br />
            <div className="row justify-content-center">
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={50}
                totalItemsCount={tmp.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              />
            </div>
            <br />
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
                  <br />
                  <br />
                  <i
                    class="fa fa-chevron-circle-right"
                    aria-hidden="true"
                    style={{ color: "#fba465" }}
                  ></i>
                  &nbsp;
                  <span style={{ color: "#000" }}>
                    nurse, surgeon, architect
                  </span>
                </p>
              </label>
              <InputGroup style={{ padding: "0px", margin: "0px" }}>
                <FormControl
                  style={{
                    borderRadius: "0px",
                    border: "0px",
                    backgroundColor: "#ee5847",
                    color: "white",
                    width: "50%",
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
