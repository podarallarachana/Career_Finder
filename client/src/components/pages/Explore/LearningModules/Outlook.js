import React from "react";
import Card from "react-bootstrap/Card";

const Outlook = props => {
  return (
    <Card style={{ border: "0px" }}>
      <Card.Body>
        <h3 className="font-weight-light">
          <i
            className="fa fa-graduation-cap"
            style={{ color: "#c0e6ff" }}
            aria-hidden="true"
          ></i>{" "}
          Outlook
        </h3>
        <p>
          Will this job still have good opportunities by the time you graduate?
          Certain jobs will not always be in demand.
        </p>
        <hr />
        <p>
          <b style={{ color: "#7cc7ff" }}>
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>{" "}
            Outloook:{" "}
          </b>
          {props.data.OccupationDetail[0].BrightOutlook}
        </p>
        <h6 className="font-weight-light">
          This field will have{" "}
          <b style={{ color: "#4178be" }}>
            {
              props.data.OccupationDetail[0].Projections.Projections[0]
                .ProjectedEmployment
            }
          </b>{" "}
          jobs nationally in{" "}
          <b style={{ color: "#4178be" }}>
            {props.data.OccupationDetail[0].Projections.EstimatedYear}
          </b>
          .{" "}
          <b style={{ color: "#4178be" }}>
            {
              props.data.OccupationDetail[0].Projections.Projections[0]
                .ProjectedAnnualJobOpening
            }
          </b>{" "}
          jobs are expected to be added every year untill then.
        </h6>
      </Card.Body>
    </Card>
  );
};

export default Outlook;
