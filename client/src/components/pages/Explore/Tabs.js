import React, { Fragment, useState } from "react";
import { Nav } from "react-bootstrap";
import LearningModules from "./LearningModules/LearningModules";
import LearningModulesHeader from "./LearningModules/LearningModulesHeader";
import ToolsTech from "./LearningModules/ToolsTech";
import CardColumns from "react-bootstrap/CardColumns";
import Spinner from "react-bootstrap/Spinner";

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
        style={{ borderRadius: "0px" }}
      >
        <Nav.Item>
          <Nav.Link eventKey="general" style={{ borderRadius: "0px" }}>
            General
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="fit" style={{ borderRadius: "0px" }}>
            Fit
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="worklife" style={{ borderRadius: "0px" }}>
            Worklife
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
              <LearningModules
                updateActives={props.updateActives}
                data={props.data}
              />
              <ToolsTech toolsData={props.toolsData} />
            </CardColumns>
          ) : null}
        </div>
      ) : (
        <p>hi</p>
      )}
    </Fragment>
  );
};

export default Tabs;
