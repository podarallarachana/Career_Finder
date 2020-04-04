import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Tools = props => {
  const [showAll, setShowAll] = useState(false);

  const displayTools = () =>
    props.toolsData.TechToolOccupationDetails.Tools.Categories.map(tool => {
      return (
        <Fragment key={tool.Title}>
          <i className="fa fa-check-square-o" aria-hidden="true"></i>{" "}
          {tool.Title}
          <br />
        </Fragment>
      );
    });

  const displayImportantTools = () =>
    props.toolsData.TechToolOccupationDetails.Tools.Categories.slice(0, 6).map(
      tool => {
        return (
          <Fragment key={tool.Title}>
            <i className="fa fa-check-square-o" aria-hidden="true"></i>{" "}
            {tool.Title}
            <br />
          </Fragment>
        );
      }
    );

  return (
    <Card style={{ border: "0px" }}>
      <Card.Body>
        <h3 className="font-weight-light">hi</h3>
        {/* <i
            className="fa fa-sun-o"
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
        <h6 className="font-weight-light">{displayImportantTools()}</h6>
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
                  View All {props.data.OccupationDetail[0].Dwas.length} Tools
                </b>
              </p>
            }
          />
        </Form>
        {showAll ? displayTools() : null} */}
      </Card.Body>
    </Card>
  );
};
export default Tools;
