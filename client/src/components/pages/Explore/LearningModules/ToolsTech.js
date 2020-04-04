import React, { Fragment } from "react";
import Tools from "./Tools";

const ToolsTech = props => {
  const displayData = () => {
    if (props.toolsData === undefined) {
      return <div className="learningModules">loading</div>;
    } else if (props.toolsData === null) {
      return (
        <div className="learningModules">sorry, unavailable right now</div>
      );
    } else {
      return (
        <Fragment>
          {props.toolsData.hasOwnProperty("TechToolOccupationDetails") &&
          props.toolsData.TechToolOccupationDetails.Tools.Categories.length !==
            0 &&
          props.toolsData.TechToolOccupationDetails.Tools.Categories !==
            undefined &&
          props.toolsData.TechToolOccupationDetails.Tools.Categories !==
            null ? (
            <Tools toolsData={props.toolsData} />
          ) : null}
        </Fragment>
      );
    }
  };

  return displayData();
};

export default ToolsTech;
