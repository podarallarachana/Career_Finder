import React, { Fragment, useState } from "react";
import { Nav } from "react-bootstrap";
import LearningModules from "./LearningModules/LearningModules";
import LearningModulesHeader from "./LearningModules/LearningModulesHeader";
import ToolsTech from "./LearningModules/ToolsTech";
import GotoQuiz from "../InteractiveTools/start-quiz";
import CardColumns from "react-bootstrap/CardColumns";
import Spinner from "react-bootstrap/Spinner";

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState("learningModules");

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
      <div className="learningModules">
        {props.data === undefined ? (
          <div className="learningModules">
            <div className="row justify-content-center">
              <Spinner animation="grow" />
            </div>
          </div>
        ) : null}
        {props.data === null ? <div className="learningModules">No</div> : null}
        {props.data !== null && props.data !== undefined ? (
          <CardColumns>
            <LearningModules
              updateActives={props.updateActives}
              data={props.data}
            />
            <ToolsTech toolsData={props.toolsData} />
          </CardColumns>
        ) : null}
      </div>
      {/* <Nav
        fill
        variant="pills"
        defaultActiveKey={activeTab}
        onSelect={handleSelect}
        style={{ borderRadius: "0px" }}
      >
        <Nav.Item>
          <Nav.Link eventKey="learningModules" style={{ borderRadius: "0px" }}>
            Learning Modules
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="activities" style={{ borderRadius: "0px" }}>
            Exploration Experience
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "learningModules" ? (
        <Fragment>
          <LearningModulesHeader data={props.data} />
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
                <LearningModules
                  updateActives={props.updateActives}
                  data={props.data}
                />
                <ToolsTech toolsData={props.toolsData} />
              </CardColumns>
            ) : null}
          </div>
        </Fragment>
      ) : (
        <GotoQuiz code={careerCode} />
      )} */}
    </Fragment>
  );
};

export default Tabs;
