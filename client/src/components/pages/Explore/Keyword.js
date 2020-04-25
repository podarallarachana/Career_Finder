import React, { useState, useEffect, Fragment } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Alert, Button } from "react-bootstrap";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import { LinkContainer } from "react-router-bootstrap";
import data from "./Data.json";

const Keyword = (props) => {
  const [results, setResults] = useState(undefined);
  const [inp, setInp] = useState("pottery");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getOccupations();
  }, []);

  const fetchResults = () => {
    var user_inp = inp.trim();
    if (user_inp.indexOf(" ") >= 0) {
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
      return <div>loading</div>;
    } else if (results === null) {
      return <div>sorry, unavailable right now</div>;
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
                    <h4 className="font-weight-light">
                      {occupation.OnetTitle}
                    </h4>
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
    <div className="keywordsearch">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="location">
          <h1>Keyword Search</h1>
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
      {displayOccupations()}
    </div>
  );
};

export default Keyword;
