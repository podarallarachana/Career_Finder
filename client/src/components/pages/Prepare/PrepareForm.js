import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Data from "../Explore/Data.json";
import { Button, Form, Alert } from "react-bootstrap";
import { GetState } from "./ValidateLocation";

const PrepareForm = (props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    getJobs();
  });

  const validateAndFetch = () => {
    if (GetState(props.user_inp.Location) === "none") {
      setShow(true);
    } else {
      setShow(false);
      //props.getEducationLevels();
      props.getCollegePrograms();
      props.getCertifications();
      props.getLicenses();
    }
  };

  const getJobs = () => {
    return (
      <Form.Group>
        <Form.Label>Occupation</Form.Label>
        <Form.Control
          as="select"
          defaultValue={props.user_inp.Occupation}
          onChange={props.updateCareer}
        >
          {Data.map((cluster) => {
            return cluster.CareerPathway.map((pathway) => {
              return pathway.Jobs.map((job) => {
                return (
                  <option key={job.Code} data-key={job.Code}>
                    {job.Occupation}
                  </option>
                );
              });
            });
          })}
        </Form.Control>
      </Form.Group>
    );
  };

  return (
    <div className="prepare-sidenav">
      <Form>
        {getJobs()}
        {show ? (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Invalid ZIP</Alert.Heading>
            <p>
              Make sure your Zip Code is 5 characters long and only contains
              numbers!
            </p>
          </Alert>
        ) : null}
        <label htmlFor="location">ZIP Code</label>
        <InputGroup className="mb-3">
          <FormControl
            id="location"
            aria-describedby="basic-addon3"
            value={props.user_inp.Location}
            onChange={props.updateLocation}
          />
        </InputGroup>

        <Form.Check
          onChange={props.updateHome}
          type="checkbox"
          id="home"
          label="willing to move out of state"
        />
        <br />
        <Button
          onClick={validateAndFetch}
          style={{
            border: "0px",
            display: "table",
            margin: "0 auto",
          }}
        >
          Go
        </Button>
      </Form>
    </div>
  );
};

export default PrepareForm;
