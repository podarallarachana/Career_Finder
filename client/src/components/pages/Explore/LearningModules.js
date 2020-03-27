import React from "react";

const LearningModules = props => {
  const displayData = () => {
    if (props.data === undefined) {
      return <div className="learningModules">loading</div>;
    } else if (props.data === null) {
      return (
        <div className="learningModules">sorry, unavailable right now</div>
      );
    } else {
      return (
        <div className="learningModules">
          <h1 className="font-weight-light">
            {props.data.OccupationDetail[0].OnetTitle}
          </h1>
        </div>
      );
    }
  };

  return displayData();
};

export default LearningModules;
