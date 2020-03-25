import React from "react";

const LearningModules = props => {
  const displayData = () => {
    if (props.data === undefined) {
      return <p>loading</p>;
    } else if (props.data === null) {
      return <p>sorry, unavailable right now</p>;
    } else {
      return <p>{props.data.OccupationDetail[0].OnetTitle}</p>;
    }
  };

  return displayData();
};

export default LearningModules;
