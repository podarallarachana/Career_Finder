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
          This career has a{" "}
          <b style={{ color: "#8cd211" }}>
            {props.data.OccupationDetail[0].BrightOutlook}
          </b>
          &nbsp;Outlook. It will have{" "}
          <b style={{ color: "#8cd211" }}>
            {
              props.data.OccupationDetail[0].Projections.Projections[0]
                .ProjectedEmployment
            }
          </b>{" "}
          jobs nationally in{" "}
          <b style={{ color: "#8cd211" }}>
            {props.data.OccupationDetail[0].Projections.ProjectedYear}
          </b>
          .&nbsp;
          <b style={{ color: "#8cd211" }}>
            {props.data.OccupationDetail[0].Projections.Projections[0].ProjectedAnnualJobOpening.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )}
          </b>{" "}
          jobs are expected to be added every year until then.
        </h6>
      </Card.Body>
    </Card>
  );
};

export default Outlook;
