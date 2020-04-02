import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const Abilities = props => {
  const displayAbilities = () =>
    props.data.OccupationDetail[0].AbilityDataList.map(ability => {
      return (
        <Fragment key={ability.ElementName}>
          <Button
            variant="light btn-sm"
            className="optionsButton"
            title={ability.ElementDescription}
          >
            {ability.ElementName}
          </Button>{" "}
        </Fragment>
      );
    });

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 sections">
      <Card>
        <Card.Header
          as="h5"
          style={{ backgroundColor: "#fa6f0f", color: "white" }}
        >
          <i className="fa fa-asterisk" aria-hidden="true"></i> Abilities
        </Card.Header>
        <Card.Body>
          <Card.Text>
            These are abilities that employees in the industry should have. Do
            you have any of these abilites? Hover over an ability to view its
            description.
            <br />
            <br />
            {displayAbilities()}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Abilities;
