import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import data from "../Data.json";

const Related = props => {
  const displayRelated = () =>
    Object.keys(props.data.OccupationDetail[0].RelatedOnetTitles).map(key => {
      return (
        <Fragment key={key}>
          <LinkContainer to={"/explore/" + key}>
            <Button
              variant="light btn-sm"
              className="optionsButton"
              onClick={updateActives()}
            >
              {props.data.OccupationDetail[0].RelatedOnetTitles[key]}
            </Button>
          </LinkContainer>{" "}
        </Fragment>
      );
    });

  const updateActives = code => {
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

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 sections">
      <Card>
        <Card.Header
          as="h5"
          style={{ backgroundColor: "#e23c58", color: "white" }}
        >
          <i className="fa fa-asterisk" aria-hidden="true"></i> Related
        </Card.Header>
        <Card.Body>
          <Card.Text>
            These are the Related that employees in the industry should have. Do
            you have any of these Related? Hover over an skill to view its
            description.
            <br />
            <br />
            {displayRelated()}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Related;
