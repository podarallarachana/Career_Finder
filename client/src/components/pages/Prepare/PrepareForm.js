import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Data from "../Explore/Data.json";

const PrepareForm = () => {
  useEffect(() => {
    getJobs();
  });

  const getJobs = () => {
    return (
      <Form.Group>
        <Form.Label>Occupation</Form.Label>
        <Form.Control as="select">
          {Data.map(cluster => {
            return cluster.CareerPathway.map(pathway => {
              return pathway.Jobs.map(job => {
                return <option key={job.Code}>{job.Occupation}</option>;
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
                  <FormControl placeholder="55129" aria-label="55129" />
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
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrepareForm;
