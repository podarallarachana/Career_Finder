import React, { Fragment, useState } from "react";
import { Nav } from "react-bootstrap";
import LearningModules from "./LearningModules/LearningModules";
import GotoQuiz from "../InteractiveTools/start-quiz";

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
          <Nav.Link eventKey="interactiveTools">Interactive Tools</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "learningModules" ? (
        <LearningModules
          updateActives={props.updateActives}
          data={props.data}
        />
      ) : 
        <GotoQuiz/>
      }
    </Fragment>
  );
};

export default Tabs;
