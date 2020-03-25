import React, { Fragment } from "react";
import { Nav } from "react-bootstrap";
import LearningModules from "./LearningModules";

class Tabs extends React.Component {
  state = {
    activeTab: "learningModules"
  };

  handleSelect = newTab => {
    this.setState({ activeTab: newTab });
  };

  render() {
    return (
      <Fragment>
        <Nav
          fill
          variant="tabs"
          defaultActiveKey={this.state.activeTab}
          onSelect={this.handleSelect}
        >
          <Nav.Item>
            <Nav.Link eventKey="learningModules">Learning Modules</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="interactiveTools">Interactive Tools</Nav.Link>
          </Nav.Item>
        </Nav>
        {this.state.activeTab === "learningModules" ? (
          <LearningModules data={this.props.data} />
        ) : null}
      </Fragment>
    );
  }
}

export default Tabs;
