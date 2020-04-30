import React, { Fragment, useState } from "react";
import { Nav } from "react-bootstrap";
import LearningModulesHeader from "./LearningModules/LearningModulesHeader";
import ToolsTech from "./LearningModules/ToolsTech";
import CardColumns from "react-bootstrap/CardColumns";
import Spinner from "react-bootstrap/Spinner";
import Abilities from "./LearningModules/Abilities";
import Knowledge from "./LearningModules/Knowledge";
import Skills from "./LearningModules/Skills";
import Related from "./LearningModules/Related";
import Activities from "./LearningModules/Activities";
import Education from "./LearningModules/Education";
import Wages from "./LearningModules/Wages";
import Interests from "./LearningModules/Interests";
import Outlook from "./LearningModules/Outlook";
import Tasks from "./LearningModules/Tasks";

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState("general");

  const handleSelect = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  if (props.data != null && props.toolsData != null)
    var careerCode = props.data.OccupationDetail[0].OnetCode;

  return (
    <Fragment>
      <LearningModulesHeader data={props.data} />
      <Nav
        fill
        variant="pills"
        defaultActiveKey={activeTab}
        onSelect={handleSelect}
        style={{ borderRadius: "0px", backgroundColor: "white" }}
      >
        <Nav.Item>
          <Nav.Link eventKey="general" style={{ borderRadius: "0px" }}>
            General Info
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="detailed" style={{ borderRadius: "0px" }}>
            Detailed Info
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "general" ? (
        <div className="learningModules">
          {props.data === undefined ? (
            <div className="learningModules">
              <div className="row justify-content-center">
                <Spinner animation="grow" />
              </div>
            </div>
          ) : null}
          {props.data === null ? (
            <div className="learningModules">No</div>
          ) : null}
          {props.data !== null && props.data !== undefined ? (
            <CardColumns>
              {props.data.OccupationDetail[0].hasOwnProperty("Wages") &&
              props.data.OccupationDetail[0].Wages.NationalWagesList.length !==
                0 &&
              props.data.OccupationDetail[0].Wages.NationalWagesList !==
                undefined &&
              props.data.OccupationDetail[0].Wages.NationalWagesList !==
                null ? (
                <Wages data={props.data} />
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

              {props.data.OccupationDetail[0].hasOwnProperty("Projections") &&
              props.data.OccupationDetail[0].Projections.Projections.length !==
                0 &&
              props.data.OccupationDetail[0].Projections.Projections !==
                undefined &&
              props.data.OccupationDetail[0].Projections.Projections !==
                null ? (
                <Outlook data={props.data} />
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

              {props.data.OccupationDetail[0].hasOwnProperty("Tasks") &&
              props.data.OccupationDetail[0].Tasks.length !== 0 &&
              props.data.OccupationDetail[0].Tasks !== undefined &&
              props.data.OccupationDetail[0].Tasks !== null ? (
                <Tasks data={props.data} />
              ) : null}
            </CardColumns>
          ) : null}
        </div>
      ) : null}

      {activeTab === "detailed" ? (
        <div className="learningModules">
          {props.data === undefined ? (
            <div className="learningModules">
              <div className="row justify-content-center">
                <Spinner animation="grow" />
              </div>
            </div>
          ) : null}
          {props.data === null ? (
            <div className="learningModules">No</div>
          ) : null}
          {props.data !== null && props.data !== undefined ? (
            <CardColumns>
              {props.data.OccupationDetail[0].hasOwnProperty(
                "RelatedOnetTitles"
              ) &&
              props.data.OccupationDetail[0].RelatedOnetTitles !== undefined &&
              props.data.OccupationDetail[0].RelatedOnetTitles !== null &&
              Object.keys(
                props.data.OccupationDetail[0].RelatedOnetTitles
              )[0] !== undefined ? (
                <Related
                  updateActives={props.updateActives}
                  data={props.data}
                />
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
                "SkillsDataList"
              ) &&
              props.data.OccupationDetail[0].SkillsDataList.length !== 0 &&
              props.data.OccupationDetail[0].SkillsDataList !== undefined &&
              props.data.OccupationDetail[0].SkillsDataList !== null ? (
                <Skills data={props.data} />
              ) : null}

              {props.data.OccupationDetail[0].hasOwnProperty(
                "AbilityDataList"
              ) &&
              props.data.OccupationDetail[0].AbilityDataList.length !== 0 &&
              props.data.OccupationDetail[0].AbilityDataList !== undefined &&
              props.data.OccupationDetail[0].AbilityDataList !== null ? (
                <Abilities data={props.data} />
              ) : null}

              <ToolsTech toolsData={props.toolsData} />
            </CardColumns>
          ) : null}
        </div>
      ) : null}
    </Fragment>
  );
};

export default Tabs;
