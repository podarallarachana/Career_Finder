import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Tools = (props) => {
  const [showAll, setShowAll] = useState(false);

  const displayTools = () =>
    props.toolsData.TechToolOccupationDetails.Tools.Categories.map((tool) => {
      return (
        <Fragment key={tool.Title}>
          <b>
            <i
              style={{ color: "#fba465" }}
              className="fa fa-chevron-circle-right"
              aria-hidden="true"
            ></i>{" "}
            {tool.Title}
          </b>
          <br />
          <h6 className="font-weight-light">
            {tool.Examples.map((example, i) => {
              return (
                <Fragment key={example.Name}>
                  {example.Name}
                  {i !== tool.Examples.length - 1 ? ", " : null}
                </Fragment>
              );
            })}
          </h6>
        </Fragment>
      );
    });

  const displayImportantTools = () =>
    props.toolsData.TechToolOccupationDetails.Tools.Categories.slice(0, 5).map(
      (tool) => {
        return (
          <Fragment key={tool.Title}>
            <b>
              <i
                style={{ color: "#fba465" }}
                className="fa fa-chevron-circle-right"
                aria-hidden="true"
              ></i>{" "}
              {tool.Title}
            </b>
            <br />
            <h6 className="font-weight-light">
              {tool.Examples.map((example, i) => {
                return (
                  <Fragment key={example.Name}>
                    {example.Name}
                    {i !== tool.Examples.length - 1 ? ", " : null}
                  </Fragment>
                );
              })}
            </h6>
          </Fragment>
        );
      }
    );

  return (
    <Card style={{ border: "0px" }}>
      <Card.Body>
        <h3 className="font-weight-light">
          <i
            className="fa fa-camera"
            aria-hidden="true"
            style={{ color: "#f86e51" }}
          ></i>{" "}
          Tools
        </h3>
        <h6 className="font-weight-light">
          Here are some tools you will be using in this occupation. Are you
          familiar with any of them?
        </h6>
        <hr />
        <p>
          <b>Tools</b>
        </p>
        {displayImportantTools()}
        <br />
        <hr />
        <Form>
          <Form.Check
            type="switch"
            id="Tools-switch"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
            label={
              <p>
                <b>
                  View All{" "}
                  {
                    props.toolsData.TechToolOccupationDetails.Tools.Categories
                      .length
                  }{" "}
                  Tools
                </b>
              </p>
            }
          />
        </Form>
        {showAll ? displayTools() : null}
      </Card.Body>
    </Card>
  );
};
export default Tools;
