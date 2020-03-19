import React, { useState, Fragment } from "react";
import { Nav } from "react-bootstrap";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("interactiveTools");

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
        <Nav.Item>
          <Nav.Link eventKey="testYourself">Test Yourself</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "interactiveTools" ? <p>YES</p> : <p>NO</p>}
    </Fragment>
  );
};

export default Tabs;
