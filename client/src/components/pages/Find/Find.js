import React from "react";
import { Nav } from "react-bootstrap";
import Quiz from "./Quiz";
import Filter from "./Filter";
import Keyword from "./Keyword";

class Find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "personalityQuiz",
    };
  }

  handleSelect = (newTab) => {
    if (newTab !== this.state.activeTab) {
      this.setState({ activeTab: newTab });
    }
  };

  render() {
    return (
      <div className="find">
        <Nav
          fill
          variant="pills"
          defaultActiveKey={this.state.activeTab}
          onSelect={this.handleSelect}
          style={{
            borderRadius: "0px",
            backgroundColor: "white",
          }}
        >
          <Nav.Item>
            <Nav.Link
              eventKey="personalityQuiz"
              style={{ borderRadius: "0px" }}
            >
              Personality Quiz
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="keywordSearch" style={{ borderRadius: "0px" }}>
              Keyword Search
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="filter" style={{ borderRadius: "0px" }}>
              Filter
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {this.state.activeTab === "personalityQuiz" ? <Quiz /> : null}
        {this.state.activeTab === "keywordSearch" ? <Keyword /> : null}
        {this.state.activeTab === "filter" ? <Filter /> : null}
        <br />
        <br />
      </div>
    );
  }
}

export default Find;
