import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Data from "../Explore/Data.json";
import { Button, Form } from "react-bootstrap";

const PrepareForm = props => {
  useEffect(() => {
    getJobs();
  });

  const getJobs = () => {
    return (
      <Form.Group>
        <Form.Label>Occupation</Form.Label>
        <Form.Control
          as="select"
          value={props.user_inp.Occupation}
          onChange={props.updateCareer}
        >
          {Data.map(cluster => {
            return cluster.CareerPathway.map(pathway => {
              return pathway.Jobs.map(job => {
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

                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    value={props.user_inp.location}
                    onChange={props.updateLocation}
                  />
                </InputGroup>

                <Form.Group>
                  <Form.Control as="select">
                    <option>I want to stay close to home</option>
                    <option>
                      I'm willing to relocate anywhere within my state
                    </option>
                    <option>
                      I would move to anywhere in the country for the best
                      career opprotunities
                    </option>
                  </Form.Control>
                </Form.Group>
              </Form>
              <Button
                style={{
                  border: "0px",
                  display: "table",
                  margin: "0 auto"
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
