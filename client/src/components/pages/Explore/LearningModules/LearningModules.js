import React from "react";
import Abilities from "./Abilities";
import Knowledge from "./Knowledge";
import Skills from "./Skills";
import Related from "./Related";

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
            <i className="fa fa-caret-right" aria-hidden="true"></i>{" "}
            {props.data.OccupationDetail[0].OnetTitle}
          </h1>
          <h5 className="font-weight-light">
            <b>Description: </b>
            {props.data.OccupationDetail[0].OnetDescription}
          </h5>
          <br />
          <div className="row">
            <div className="col-12"></div>
          </div>
          <div className="row">
            {props.data.OccupationDetail[0].hasOwnProperty("AbilityDataList") &&
            props.data.OccupationDetail[0].AbilityDataList.length !== 0 &&
            props.data.OccupationDetail[0].AbilityDataList !== undefined &&
            props.data.OccupationDetail[0].AbilityDataList !== null ? (
              <Abilities data={props.data} />
            ) : null}
            {props.data.OccupationDetail[0].hasOwnProperty("SkillsDataList") &&
            props.data.OccupationDetail[0].SkillsDataList.length !== 0 &&
            props.data.OccupationDetail[0].SkillsDataList !== undefined &&
            props.data.OccupationDetail[0].SkillsDataList !== null ? (
              <Skills data={props.data} />
            ) : null}
            {props.data.OccupationDetail[0].hasOwnProperty(
              "KnowledgeDataList"
            ) &&
            props.data.OccupationDetail[0].KnowledgeDataList.length !== 0 &&
            props.data.OccupationDetail[0].KnowledgeDataList !== undefined &&
            props.data.OccupationDetail[0].KnowledgeDataList !== null ? (
              <Knowledge data={props.data} />
            ) : null}
            {props.data.OccupationDetail[0].hasOwnProperty(
              "RelatedOnetTitles"
            ) &&
            props.data.OccupationDetail[0].RelatedOnetTitles !== undefined &&
            props.data.OccupationDetail[0].RelatedOnetTitles !== null ? (
              <Related updateActives={props.updateActives} data={props.data} />
            ) : null}
          </div>
        </div>
      );
    }
  };

  return displayData();
};

export default LearningModules;
