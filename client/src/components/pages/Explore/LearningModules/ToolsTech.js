import React from "react";
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
      return <Tools toolsData={props.toolsData} />;
    }
  };

  return displayData();
};

export default ToolsTech;
