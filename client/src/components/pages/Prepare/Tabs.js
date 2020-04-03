import React, { Fragment, useState } from "react";
import { Nav } from "react-bootstrap";
import College from "./College";

const Tabs = props => {
  const [activeTab, setActiveTab] = useState("college");

  const handleSelect = newTab => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  return (
    <Fragment>
      <h5 className="font-weight-light">
        <b>Step 3: </b>put together a preparation plan
      </h5>
      <Nav
        fill
        variant="tabs"
        defaultActiveKey={activeTab}
        onSelect={handleSelect}
      >
        <Nav.Item>
          <Nav.Link eventKey="college">College</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="certifications">Certifications</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "college" ? <College /> : null}
    </Fragment>
  );
};

export default Tabs;
