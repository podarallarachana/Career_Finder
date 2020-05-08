import React, { useState, useEffect, Fragment } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Alert, Button } from "react-bootstrap";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import data from "../Explore/Data.json";
import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-js-pagination";

const Keyword = (props) => {
  const [results, setResults] = useState(undefined);
  const [inp, setInp] = useState("pottery");
  const [show, setShow] = useState(false);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    getOccupations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const getOccupation = (code) => {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].CareerPathway.length; j++) {
        for (var z = 0; z < data[i].CareerPathway[j].Jobs.length; z++) {
          if (data[i].CareerPathway[j].Jobs[z].Code === code) {
            return {
              occupation: data[i].CareerPathway[j].Jobs[z],
              pathway: data[i].CareerPathway[j].Pathway,
              cluster: data[i].CareerCluster,
            };
          }
        }
      }
    }
  };

  const fetchResults = () => {
    var user_inp = inp.trim();
    if (user_inp.indexOf(" ") >= 0 || user_inp === "") {
      setShow(true);
    } else {
      setShow(false);
      getOccupations();
    }
  };

  const getOccupations = async () => {
    setActivePage(1);
    setResults(undefined);
    try {
      const { data } = await axios({
        method: "get", //6000 records limit (since field is required)
        url: `https://api.careeronestop.org/v1/occupation/${process.env.REACT_APP_USER_ID}/${inp}/Y/0/6000`,
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        },
      });
      setResults(data);
    } catch (e) {
      setResults(null);
    }
  };

  const displayOccupations = () => {
    if (results === undefined) {
      return (
        <div className="row justify-content-center" style={{ padding: "40px" }}>
          <Spinner animation="grow" variant="primary" />
        </div>
      );
    } else if (results === null) {
      return (
        <Alert variant="danger">
          <Alert.Heading>Not Available</Alert.Heading>
          <p>
            Try again, the connection may be weak or your keyword may be too
            specific.
          </p>
        </Alert>
      );
    } else {
      return (
        <Fragment>
          <div className="row justify-content-center">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={activePage}
              itemsCountPerPage={50}
              totalItemsCount={results.OccupationList.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
          <div className="row">
            {results.OccupationList.slice(
              (activePage - 1) * 50,
              (activePage - 1) * 50 + 50
            ).map((occupation, index) => {
              var color = getColors(index.toString());
              return (
                <div
                  key={occupation.OnetCode}
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
                          {" "}
                          {index + 1 + (activePage - 1) * 50}
                        </span>
                        .{" "}
                        {
                          getOccupation(occupation.OnetCode).occupation
                            .Occupation
                        }
                      </h4>
                      <hr />
                      <small>
                        <b>Pathway:&nbsp;</b>
                        {getOccupation(occupation.OnetCode).pathway}
                        <br />
                        <b>Industry:&nbsp;</b>
                        {getOccupation(occupation.OnetCode).cluster}
                      </small>
                      <br />
                      <br />
                      <div className="row justify-content-center">
                        <LinkContainer
                          to={"/explore/" + occupation.OnetCode}
                          style={{
                            border: "0px",
                            outline: "0px",
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
          <div className="row justify-content-center">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={activePage}
              itemsCountPerPage={50}
              totalItemsCount={results.OccupationList.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
        </Fragment>
      );
    }
  };

  const updateInp = (e) => {
    setInp(e.target.value);
  };

  return (
    <div>
      <Jumbotron className="filterheader" style={{ marginBottom: "0px" }}>
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6">
            <Form
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
                backgroundColor: "white",
                paddingTop: "40px",
                paddingBottom: "40px",
              }}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label htmlFor="location">
                <h1 style={{ color: "#1e3163" }}>
                  <b>
                    <i className="fa fa-key" aria-hidden="true"></i>&nbsp;KEY
                  </b>
                </h1>
                <p style={{ color: "#1e3163" }}>
                  <b>Instructions: </b>Do you like cooking? Math? Maybe working
                  outdoors? Search for a career by keyword using the Keyword
                  Search Tool.
                </p>
                <p className="font-weight-light">
                  <i
                    class="fa fa-chevron-circle-right"
                    aria-hidden="true"
                    style={{ color: "#1e3163" }}
                  ></i>
                  &nbsp;pottery, coal, gardening
                </p>
              </label>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Enter a keyword..."
                  id="keyword_search"
                  value={inp}
                  onChange={updateInp}
                />
                {/* <InputGroup.Append>
                  <Button onClick={() => fetchResults()} variant="primary">
                    Search
                  </Button>
                </InputGroup.Append> */}
              </InputGroup>
            </Form>
            <div
              style={{
                padding: "0px 40px 40px 40px",
                backgroundColor: "white",
              }}
            >
              <div className="row justify-content-center">
                <Button
                  onClick={() => fetchResults()}
                  variant="outline-primary"
                  className="optionsButton"
                >
                  Get Occupations
                </Button>
              </div>
            </div>
            {show ? (
              <Alert
                style={{ margin: "0px", borderRadius: "0px" }}
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>Invalid keyword</Alert.Heading>
                <p>Make sure you only enter one keyword!</p>
              </Alert>
            ) : null}
          </div>
        </div>
      </Jumbotron>
      <div
        style={{
          padding: "15px",
        }}
      >
        {displayOccupations()}
      </div>
    </div>
  );
};

export default Keyword;
