import React, { useState, useEffect, Fragment } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Alert, Button } from "react-bootstrap";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

const Keyword = () => {
  const [results, setResults] = useState(undefined);
  const [inp, setInp] = useState("pottery");

  useEffect(() => {
    getOccupations();
  }, []);

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
        <Fragment>
          <CardColumns>
            {results.OccupationList.map((occupation) => {
              return (
                <Card key={occupation.OnetCode}>
                  <Card.Body>
                    <h4 className="font-weight-light">
                      {occupation.OnetTitle}
                    </h4>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Fragment>
      );
    }
  };

  const updateInp = (e) => {
    setInp(e.target.value);
  };

  return (
    <div className="keywordsearch">
      <Form>
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
            <Button onClick={() => console.log("hi")} variant="primary">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {displayOccupations()}
    </div>
  );
};

export default Keyword;
