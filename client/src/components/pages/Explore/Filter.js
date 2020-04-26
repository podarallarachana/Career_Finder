import React, { Fragment, useState } from "react";
import data from "./Data.json";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Alert, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import { LinkContainer } from "react-router-bootstrap";
import Pagination from "react-js-pagination";
import Jumbotron from "react-bootstrap/Jumbotron";

const Filter = (props) => {
  const [filterText, setFilterText] = useState("");
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

    var colors = [
      "#8cd211",
      "#5aa700",
      "#de3364",
      "#eb4f3c",
      "#ff871e",
      "#7cc7ff",
      "#5aaafa",
      "#5596e6",
    ];

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
                var color = colors[Math.floor(Math.random() * 8)];
                return (
                  <LinkContainer
                    key={occupation.occupation.Code}
                    to={"/explore/" + occupation.occupation.Code}
                    style={{ border: "0px", outline: "0px" }}
                  >
                    <Card onClick={() => updateActives(occupation.Code)}>
                      <Card.Body>
                        <h5 className="font-weight-light">
                          <i
                            className="fa fa-arrow-circle-right"
                            aria-hidden="true"
                            style={{
                              color: color,
                            }}
                          ></i>{" "}
                          {occupation.occupation.Occupation}
                        </h5>
                        <small>
                          <b>Pathway: </b>
                          {occupation.pathway}
                        </small>
                        <br />
                        <small>
                          <b>Cluster: </b>
                          {occupation.cluster}
                        </small>
                        <hr />
                        <div className="row justify-content-center">
                          <Button
                            style={{
                              backgroundColor: color,
                              color: "white",
                              borderRadius: "20px",
                              outline: "0px",
                              border: "0px",
                            }}
                          >
                            <i className="fa fa-link" aria-hidden="true"></i>{" "}
                            Learn More
                          </Button>
                        </div>
                      </Card.Body>
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
        <Form>
          <label htmlFor="location">
            <h1 className="font-weight-light" style={{ color: "white" }}>
              <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
              &nbsp;Explore
            </h1>
            <h6 className="font-weight-light" style={{ color: "white" }}>
              Have an occupation in mind? Find it using the filter tool and
              click the link to visit the profile and learn more about the
              occupation!
              <br />
              <br />
              <b>Examples: </b>Nurse, Programmer...
            </h6>
          </label>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              ref={textInput}
              onChange={filterUpdate}
              placeholder="Type to Filter..."
              id="search_bar"
            />
          </InputGroup>
        </Form>
      </Jumbotron>
      <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
        {displayOccupations()}
      </div>
    </div>
  );
};

export default Filter;
