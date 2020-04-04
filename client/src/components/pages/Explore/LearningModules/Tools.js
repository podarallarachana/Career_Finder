import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Tools = props => {
  const [showAll, setShowAll] = useState(false);

  const displayTools = () =>
    props.toolsData.TechToolOccupationDetails.Tools.Categories.map(tool => {
      return (
        <Fragment key={tool.Title}>
          <b>
            <i
              style={{ color: "#ffc800" }}
              className="fa fa-arrow-circle-right"
              aria-hidden="true"
            ></i>{" "}
            {tool.Title}
          </b>
          <br />
          {tool.Examples.map(example => {
            return (
              <Fragment key={example.Name}>
                <h6 className="font-weight-light">
                  {example.Name}
                  {<br />}
                </h6>
              </Fragment>
            );
          })}
        </Fragment>
      );
    });

  const displayImportantTools = () =>
    props.toolsData.TechToolOccupationDetails.Tools.Categories.slice(0, 6).map(
      tool => {
        return (
          <Fragment key={tool.Title}>
            <b>
              <i
                style={{ color: "#ffc800" }}
                className="fa fa-arrow-circle-right"
                aria-hidden="true"
              ></i>{" "}
              {tool.Title}
            </b>
            <br />
            {tool.Examples.map(example => {
              return (
                <Fragment key={example.Name}>
                  <h6 className="font-weight-light">
                    {example.Name}
                    {<br />}
                  </h6>
                </Fragment>
              );
            })}
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
            style={{ color: "#ffc800" }}
          ></i>{" "}
          Tools
        </h3>
        <p>
          Here are some tools you will be using in this occupation. Are you
          familiar with any of them?
        </p>
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
