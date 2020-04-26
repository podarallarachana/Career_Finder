import React, { Fragment } from "react";
import Tools from "./Tools";
import Technology from "./Technology";

const ToolsTech = (props) => {
  const displayData = () => {
    if (props.toolsData === undefined) {
      return null;
    } else if (props.toolsData === null) {
      return null;
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

          {props.toolsData.hasOwnProperty("TechToolOccupationDetails") &&
          props.toolsData.TechToolOccupationDetails.Technology.CategoryList
            .length !== 0 &&
          props.toolsData.TechToolOccupationDetails.Technology.CategoryList !==
            undefined &&
          props.toolsData.TechToolOccupationDetails.Technology.CategoryList !==
            null ? (
            <Technology toolsData={props.toolsData} />
          ) : null}
        </Fragment>
      );
    }
  };

  return displayData();
};

export default ToolsTech;
