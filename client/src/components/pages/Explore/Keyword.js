import React, { useState, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Alert, Button } from "react-bootstrap";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import { LinkContainer } from "react-router-bootstrap";
import data from "./Data.json";
import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";

const Keyword = (props) => {
  const [results, setResults] = useState(undefined);
  const [inp, setInp] = useState("pottery");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getOccupations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchResults = () => {
    var user_inp = inp.trim();
    if (user_inp.indexOf(" ") >= 0 || user_inp === "") {
      setShow(true);
      setResults(null);
    } else {
      setShow(false);
      getOccupations();
    }
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

  const getOccupations = async () => {
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
        <div className="row justify-content-center">
          <Spinner animation="grow" />
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
        <CardColumns>
          {results.OccupationList.map((occupation) => {
            return (
              <LinkContainer
                key={occupation.OnetCode}
                to={"/explore/" + occupation.OnetCode}
              >
                <Card onClick={() => updateActives(occupation.OnetCode)}>
                  <Card.Body>
                    <h6 className="font-weight-light">
                      <b>Occupation: </b>
                      {occupation.OnetTitle}
                    </h6>
                    <hr />
                    <div className="row justify-content-center">
                      <Button variant="outline-primary">
                        <i className="fa fa-link" aria-hidden="true"></i> Learn
                        More
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </LinkContainer>
            );
          })}
        </CardColumns>
      );
    }
  };

  const updateInp = (e) => {
    setInp(e.target.value);
  };

  return (
    <div>
      <Jumbotron className="filterheader">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="location">
            <h1 className="font-weight-light" style={{ color: "white" }}>
              <i className="fa fa-search" aria-hidden="true"></i>
              &nbsp;Keyword Search
            </h1>
            <h6 className="font-weight-light" style={{ color: "white" }}>
              Do you like cooking? Math? Maybe working outdoors? Search for a
              career by keyword using the Keyword Search Tool.
              <br />
              <br />
              <b>Examples: </b>Pottery, Dance, Music...
            </h6>
          </label>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Enter a keyword..."
              id="keyword_search"
              value={inp}
              onChange={updateInp}
            />
            <InputGroup.Append>
              <Button onClick={() => fetchResults()} variant="primary">
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
          {show ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Invalid keyword</Alert.Heading>
              <p>Make sure you only enter one keyword!</p>
            </Alert>
          ) : null}
        </Form>
      </Jumbotron>
      <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
        {displayOccupations()}
      </div>
    </div>
  );
};

export default Keyword;
