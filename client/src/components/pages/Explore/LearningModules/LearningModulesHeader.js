import React, { Fragment } from "react";

const LearningModulesHeader = props => {
  const displayData = () => {
    if (props.data === undefined) {
      return null;
    } else if (props.data === null) {
      return null;
    } else {
      return (
        <Fragment>
          <div className="learningModules">
            {" "}
            <h1 className="font-weight-light">
              <i className="fa fa-caret-right" aria-hidden="true"></i>{" "}
              {props.data.OccupationDetail[0].OnetTitle}
            </h1>
            <h5 className="font-weight-light">
              <b>Description: </b>
              {props.data.OccupationDetail[0].OnetDescription}
            </h5>
            <h6 className="font-weight-light">
              <b>
                <i className="fa fa-envira" style={{}} aria-hidden="true"></i>{" "}
                Is this job environmentally friendly?{" "}
              </b>
              {props.data.OccupationDetail[0].Green}
            </h6>
            <br />
            <div className="row">
              <div className="col-12"></div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <video width="100%" controls autoPlay muted loop>
                  <source
                    src={
                      "https://cdn.careeronestop.org/OccVids/OccupationVideos/" +
                      "13-2011.01" +
                      ".mp4"
                    }
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  };

  return displayData();
};

export default LearningModulesHeader;
