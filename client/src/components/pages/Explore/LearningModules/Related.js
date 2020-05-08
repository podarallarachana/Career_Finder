import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import data from "../Data.json";

const Related = (props) => {
  const displayRelated = () =>
    Object.keys(props.data.OccupationDetail[0].RelatedOnetTitles).map((key) => {
      return (
        <Fragment key={key}>
          <LinkContainer
            style={{ margin: "0px 4px 4px 0px" }}
            to={"/explore/" + key}
          >
            <Button
              variant="light btn-xs"
              className="optionsButton"
              onClick={() => updateActives(key)}
            >
              {props.data.OccupationDetail[0].RelatedOnetTitles[key]}
            </Button>
          </LinkContainer>
        </Fragment>
      );
    });

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

  return (
    <Card style={{ border: "0px" }}>
      <Card.Body>
        <h3 className="font-weight-light">
          <i
            className="fa fa-link"
            style={{ color: "#1e3163" }}
            aria-hidden="true"
          ></i>{" "}
          <b>Related </b>Links
        </h3>
        <p>Check out similar careers. Click on a link below.</p>
        <hr />
        {displayRelated()}
      </Card.Body>
    </Card>
  );
};

export default Related;
