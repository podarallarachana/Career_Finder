import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const Skills = props => {
  const displaySkills = () =>
    props.data.OccupationDetail[0].SkillsDataList.map(skill => {
      return (
        <Fragment key={skill.ElementName}>
          <Button
            variant="light btn-sm"
            className="optionsButton"
            title={skill.ElementDescription}
          >
            {skill.ElementName}
          </Button>{" "}
        </Fragment>
      );
    });

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 sections">
      <Card>
        <Card.Header
          as="h5"
          style={{ backgroundColor: "#e23c58", color: "white" }}
        >
          <i className="fa fa-asterisk" aria-hidden="true"></i> Skills
        </Card.Header>
        <Card.Body>
          <Card.Text>
            These are the skills that employees in the industry should have. Do
            you have any of these skills? Hover over an skill to view its
            description.
            <br />
            <br />
            {displaySkills()}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Skills;
