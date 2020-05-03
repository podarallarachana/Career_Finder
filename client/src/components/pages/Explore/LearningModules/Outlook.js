import React from "react";
import Card from "react-bootstrap/Card";

const Outlook = (props) => {
  return (
    <Card style={{ border: "0px" }}>
      <Card.Body>
        <h3 className="font-weight-light">
          <i
            className="fa fa-globe"
            style={{ color: "#8cd211" }}
            aria-hidden="true"
          ></i>{" "}
          Outlook
        </h3>
        <p>
          Will this job still have good opportunities by the time you graduate?
          Certain jobs will not always be in demand.
        </p>
        <hr />
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#c8f08f" }}
            aria-hidden="true"
          ></i>{" "}
          <b>Outlook: </b>
          {props.data.OccupationDetail[0].BrightOutlook}
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#8cd211" }}
            aria-hidden="true"
          ></i>{" "}
          <b>Yearly Growth: </b>
          {props.data.OccupationDetail[0].Projections.Projections[0].ProjectedAnnualJobOpening.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )}{" "}
          new jobs
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#5aa700" }}
            aria-hidden="true"
          ></i>{" "}
          <b>
            2028 Projections{" "}
            {props.data.OccupationDetail[0].Projections.ProjectedYear}:{" "}
          </b>{" "}
          {
            props.data.OccupationDetail[0].Projections.Projections[0]
              .ProjectedEmployment
          }
        </h6>
      </Card.Body>
    </Card>
  );
};

export default Outlook;
