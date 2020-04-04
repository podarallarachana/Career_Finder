import React, { Fragment, useState } from "react";
import { Nav } from "react-bootstrap";
import LearningModules from "./LearningModules/LearningModules";
import LearningModulesHeader from "./LearningModules/LearningModulesHeader";
import ToolsTech from "./LearningModules/ToolsTech";
import GotoQuiz from "../InteractiveTools/start-quiz";
import CardColumns from "react-bootstrap/CardColumns";

const Tabs = props => {
  const [activeTab, setActiveTab] = useState("learningModules");

  const handleSelect = newTab => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  return (
    <Fragment>
      <Nav
        fill
        variant="tabs"
        defaultActiveKey={activeTab}
        onSelect={handleSelect}
      >
        <Nav.Item>
          <Nav.Link eventKey="learningModules">Learning Modules</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="activities">Activities</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "learningModules" ? (
        <Fragment>
          <LearningModulesHeader data={props.data} />
          <div className="learningModules">
            <CardColumns>
              <LearningModules
                updateActives={props.updateActives}
                data={props.data}
              />
              <ToolsTech toolsData={props.toolsData} />
            </CardColumns>
          </div>
        </Fragment>
      ) : (
        <GotoQuiz />
      )}
    </Fragment>
  );
};

export default Tabs;
