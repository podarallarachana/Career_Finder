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
        <Form.Label>
          <i
            className="fa fa-chevron-circle-right"
            aria-hidden="true"
            style={{ color: "#1e3163" }}
          ></i>
          &nbsp;
          <span style={{ color: "#000" }}>Occupation</span>
        </Form.Label>
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
    <div>
      <Form
        style={{
          paddingLeft: "40px",
          paddingRight: "40px",
          backgroundColor: "white",
          paddingTop: "40px",
          paddingBottom: "40px",
          marginBottom: "0px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 style={{ color: "#1e3163" }}>
          <b>
            <i className="fa fa-cogs" aria-hidden="true"></i>&nbsp;PREPARE{" "}
          </b>
        </h1>
        <p style={{ color: "#1e3163" }}>
          <b>Instructions: </b>
          Find college programs, licenses, and certifications to help you
          prepare for your career.
        </p>
        {getJobs()}
        <label htmlFor="location">
          {" "}
          <i
            className="fa fa-chevron-circle-right"
            aria-hidden="true"
            style={{ color: "#1e3163" }}
          ></i>
          &nbsp;
          <span style={{ color: "#000" }}>Zip Code</span>
        </label>
        <InputGroup className="mb-3">
          <FormControl
            id="location"
            aria-describedby="basic-addon3"
            value={props.user_inp.Location}
            onChange={props.updateLocation}
            placeholder="Enter ZIP.."
          />
        </InputGroup>
        <Form.Check
          onChange={props.updateHome}
          type="checkbox"
          id="home"
          label={
            <h6 className="font-weight-light">
              {"willing to move out of state"}
            </h6>
          }
        />
        <br />
        <div className="row justify-content-center">
          <Button
            onClick={validateAndFetch}
            variant="outline-primary"
            className="optionsButton"
            style={{
              display: "table",
            }}
          >
            Search
          </Button>
        </div>
      </Form>
      {show ? (
        <Alert
          style={{ margin: "0px", borderRadius: "0px" }}
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>Invalid ZIP</Alert.Heading>
          <p>
            Make sure your Zip Code is 5 characters long and only contains
            numbers!
          </p>
        </Alert>
      ) : null}
    </div>
  );
};

export default PrepareForm;
