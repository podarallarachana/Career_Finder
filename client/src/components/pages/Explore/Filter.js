import React, { Fragment, useState } from "react";
import data from "./Data.json";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Form, Alert } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import { LinkContainer } from "react-router-bootstrap";

const Filter = (props) => {
  const [filterText, setFilterText] = useState("");
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

  const displayOccupations = () => {
    var tmp = [];
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].CareerPathway.length; j++) {
        for (var z = 0; z < data[i].CareerPathway[j].Jobs.length; z++) {
          tmp.push(data[i].CareerPathway[j].Jobs[z]);
        }
      }
    }

    tmp = tmp.filter((occupation) =>
      occupation.Occupation.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
      <Fragment>
        {tmp.length === 0 ? (
          <Alert variant="warning">
            <Alert.Heading>No Occupations Found!</Alert.Heading>
            <p>Broaden you filter or use the keyword search!</p>
          </Alert>
        ) : (
          <CardColumns>
            {tmp.map((occupation) => {
              return (
                <LinkContainer
                  key={occupation.Code}
                  to={"/explore/" + occupation.Code}
                >
                  <Card onClick={() => updateActives(occupation.Code)}>
                    <Card.Body>
                      <h4 className="font-weight-light">
                        {occupation.Occupation}
                      </h4>
                    </Card.Body>
                  </Card>
                </LinkContainer>
              );
            })}
          </CardColumns>
        )}
      </Fragment>
    );
  };

  return (
    <div className="searchfilter">
      <Form>
        <label htmlFor="location">
          <h1>Explore</h1>
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
      {displayOccupations()}
    </div>
  );
};

export default Filter;
