import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const Knowledge = props => {
  const displayKnowledge = () =>
    props.data.OccupationDetail[0].KnowledgeDataList.map(knowledge => {
      return (
        <Fragment key={knowledge.ElementName}>
          <Button
            variant="light btn-sm"
            className="optionsButton"
            title={knowledge.ElementDescription}
          >
            {knowledge.ElementName}
          </Button>{" "}
        </Fragment>
      );
    });

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 sections">
      <Card>
        <Card.Header
          as="h5"
          style={{ backgroundColor: "#ffa600", color: "white" }}
        >
          <i className="fa fa-asterisk" aria-hidden="true"></i> Knowledge
        </Card.Header>
        <Card.Body>
          <Card.Text>
            These are same areas of knowledge that employees in this industry
            need to know. See if your school offers any classes in these
            subjects or explore them on your own. Hover over a subject to view
            its description.
            <br />
            <br />
            {displayKnowledge()}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Knowledge;
