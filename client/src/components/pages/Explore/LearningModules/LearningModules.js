import React from "react";
import Abilities from "./Abilities";
import Knowledge from "./Knowledge";
import Skills from "./Skills";
import Related from "./Related";
import Activities from "./Activities";
import Education from "./Education";
import Wages from "./Wages";
import Interests from "./Interests";
import Outlook from "./Outlook";
import CardColumns from "react-bootstrap/CardColumns";

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
          <h6 className="font-weight-light">
            <b>
              <i className="fa fa-envira" style={{}} aria-hidden="true"></i> Is
              this job environmentally friendly? :{" "}
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
          <br />
          <CardColumns>
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
              "InterestDataList"
            ) &&
            props.data.OccupationDetail[0].InterestDataList.length !== 0 &&
            props.data.OccupationDetail[0].InterestDataList !== undefined &&
            props.data.OccupationDetail[0].InterestDataList !== null ? (
              <Interests data={props.data} />
            ) : null}

            {props.data.OccupationDetail[0].hasOwnProperty(
              "KnowledgeDataList"
            ) &&
            props.data.OccupationDetail[0].KnowledgeDataList.length !== 0 &&
            props.data.OccupationDetail[0].KnowledgeDataList !== undefined &&
            props.data.OccupationDetail[0].KnowledgeDataList !== null ? (
              <Knowledge data={props.data} />
            ) : null}

            {props.data.OccupationDetail[0].hasOwnProperty("Dwas") &&
            props.data.OccupationDetail[0].Dwas.length !== 0 &&
            props.data.OccupationDetail[0].Dwas !== undefined &&
            props.data.OccupationDetail[0].Dwas !== null ? (
              <Activities data={props.data} />
            ) : null}

            {props.data.OccupationDetail[0].hasOwnProperty(
              "EducationTraining"
            ) &&
            props.data.OccupationDetail[0].EducationTraining.EducationType
              .length !== 0 &&
            props.data.OccupationDetail[0].EducationTraining.EducationType !==
              undefined &&
            props.data.OccupationDetail[0].EducationTraining.EducationType !==
              null ? (
              <Education data={props.data} />
            ) : null}

            {props.data.OccupationDetail[0].hasOwnProperty("Wages") &&
            props.data.OccupationDetail[0].Wages.NationalWagesList.length !==
              0 &&
            props.data.OccupationDetail[0].Wages.NationalWagesList !==
              undefined &&
            props.data.OccupationDetail[0].Wages.NationalWagesList !== null ? (
              <Wages data={props.data} />
            ) : null}

            {props.data.OccupationDetail[0].hasOwnProperty("Projections") &&
            props.data.OccupationDetail[0].Projections.Projections.length !==
              0 &&
            props.data.OccupationDetail[0].Projections.Projections !==
              undefined &&
            props.data.OccupationDetail[0].Projections.Projections !== null ? (
              <Outlook data={props.data} />
            ) : null}

            {props.data.OccupationDetail[0].hasOwnProperty(
              "RelatedOnetTitles"
            ) &&
            props.data.OccupationDetail[0].RelatedOnetTitles !== undefined &&
            props.data.OccupationDetail[0].RelatedOnetTitles !== null ? (
              <Related updateActives={props.updateActives} data={props.data} />
            ) : null}
          </CardColumns>
        </div>
      );
    }
  };

  return displayData();
};

export default LearningModules;
