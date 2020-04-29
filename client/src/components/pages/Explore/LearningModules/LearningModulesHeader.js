import React, { Fragment } from "react";

const LearningModulesHeader = (props) => {
  const displayData = () => {
    if (props.data === undefined) {
      return null;
    } else if (props.data === null) {
      return null;
    } else {
      return (
        <Fragment>
          <div
            style={{
              padding: "15px",
              backgroundColor: "#5596e6",
              color: "white",
            }}
          >
            <h1 className="font-weight-light">
              <i className="fa fa-certificate" aria-hidden="true"></i>{" "}
              {props.data.OccupationDetail[0].OnetTitle}
            </h1>
            <h6 className="font-weight-light">
              <b>Description: </b>
              {props.data.OccupationDetail[0].OnetDescription}
            </h6>
            <h6 className="font-weight-light">
              <b>Eco Friendly: </b>
              {props.data.OccupationDetail[0].Green}
            </h6>
          </div>

          <div
            style={{
              backgroundColor: "black",
            }}
          >
            <video
              width="100%"
              controls
              autoPlay
              muted
              loop
              style={{ display: "block" }}
            >
              <source
                src={
                  "https://cdn.careeronestop.org/OccVids/OccupationVideos/" +
                  (props.data ? props.data.OccupationDetail[0].OnetCode : "") +
                  ".mp4"
                }
                type="video/mp4"
              />
            </video>
          </div>
        </Fragment>
      );
    }
  };

  return displayData();
};

export default LearningModulesHeader;
