import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Technology = props => {
  const [showAll, setShowAll] = useState(false);

  const displayTechnologies = () =>
    props.toolsData.TechToolOccupationDetails.Technology.CategoryList.map(
      technology => {
        return (
          <Fragment key={technology.Title}>
            <b>
              <i
                style={{ color: "#8cd211" }}
                className="fa fa-chevron-circle-right"
                aria-hidden="true"
              ></i>{" "}
              {technology.Title}
            </b>
            <br />
            <h6 className="font-weight-light">
              {technology.Examples.map(example => {
                return <Fragment key={example.Name}>{example.Name}, </Fragment>;
              })}
            </h6>
          </Fragment>
        );
      }
    );

  const displayImportantTechnologies = () =>
    props.toolsData.TechToolOccupationDetails.Technology.CategoryList.slice(
      0,
      6
    ).map(technology => {
      return (
        <Fragment key={technology.Title}>
          <b>
            <i
              style={{ color: "#8cd211" }}
              className="fa fa-chevron-circle-right"
              aria-hidden="true"
            ></i>{" "}
            {technology.Title}
          </b>
          <br />
          <h6 className="font-weight-light">
            {technology.Examples.map(example => {
              return <Fragment key={example.Name}>{example.Name}, </Fragment>;
            })}
          </h6>
        </Fragment>
      );
    });

  return (
    <Card style={{ border: "0px" }}>
      <Card.Body>
        <h3 className="font-weight-light">
          <i
            className="fa fa-desktop"
            aria-hidden="true"
            style={{ color: "#8cd211" }}
          ></i>{" "}
          Technologies
        </h3>
        <p>
          Here are some technologies you will need to be familiar with in this
          occupation. Have you ever used any of these before?
        </p>
        <hr />
        <p>
          <b>technologys</b>
        </p>
        {displayImportantTechnologies()}
        <br />
        <hr />
        <Form>
          <Form.Check
            type="switch"
            id="Technology-switch"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
            label={
              <p>
                <b>
                  View All{" "}
                  {
                    props.toolsData.TechToolOccupationDetails.Technology
                      .CategoryList.length
                  }{" "}
                  technologies
                </b>
              </p>
            }
          />
        </Form>
        {showAll ? displayTechnologies() : null}
      </Card.Body>
    </Card>
  );
};
export default Technology;
