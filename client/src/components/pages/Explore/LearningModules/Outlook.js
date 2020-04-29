import React from "react";
import Card from "react-bootstrap/Card";

const Outlook = (props) => {
  return (
    <Card style={{ border: "0px" }}>
      <Card.Body>
        <h3 className="font-weight-light">
          <i
            className="fa fa-globe"
            style={{ color: "#7cc7ff" }}
            aria-hidden="true"
          ></i>{" "}
          Outlook
        </h3>
        <h6 className="font-weight-light">
          <b>Outloook: </b>
          {props.data.OccupationDetail[0].BrightOutlook}
        </h6>
        <hr />
        <p>
          Will this job still have good opportunities by the time you graduate?
          Certain jobs will not always be in demand.
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
            {props.data.OccupationDetail[0].Projections.ProjectedYear}
          </b>
          .{" "}
          <b style={{ color: "#4178be" }}>
            {props.data.OccupationDetail[0].Projections.Projections[0].ProjectedAnnualJobOpening.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )}
          </b>{" "}
          jobs are expected to be added every year untill then.
        </h6>
      </Card.Body>
    </Card>
  );
};

export default Outlook;
