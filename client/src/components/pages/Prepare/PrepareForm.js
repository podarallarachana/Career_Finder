import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Data from "../Explore/Data.json";
import { Button, Form, Alert } from "react-bootstrap";

const PrepareForm = (props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    getJobs();
  });

  const validateAndFetch = () => {
    if (
      props.user_inp.Location.length != 5 ||
      !/^\d+$/.test(props.user_inp.Location)
    ) {
      setShow(true);
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
    <div className="row">
      <div className="col-12">
        <h1 className="font-weight-light">Prepare for your career!</h1>
        <br />
        <h5 className="font-weight-light">
          <b>Step 1: </b>enter your info
        </h5>
        <br />
        <Card className="prepare-options">
          <div className="row justify-content-center">
            <div className="xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6">
              <Form>
                {getJobs()}
                {show ? (
                  <Alert
                    variant="danger"
                    onClose={() => setShow(false)}
                    dismissible
                  >
                    <Alert.Heading>Invalid ZIP</Alert.Heading>
                    <p>
                      Make sure your Zip Code is 5 characters long and only
                      contains numbers!
                    </p>
                  </Alert>
                ) : null}
                <label htmlFor="location">ZIP Code</label>
                <InputGroup
                  className="mb-3"
                  value={props.user_inp.Location}
                  onChange={props.updateLocation}
                >
                  <FormControl
                    id="location"
                    aria-describedby="basic-addon3"
                    placeholder="32601"
                  />
                </InputGroup>
              </Form>
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
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrepareForm;
