import React from "react";
import { Nav } from "react-bootstrap";
import Filter from "./Filter";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "filter",
    };
  }

  handleSelect = (newTab) => {
    if (newTab !== this.state.activeTab) {
      this.setState({ activeTab: newTab });
    }
  };

  render() {
    return (
      <div>
        <Nav
          fill
          variant="pills"
          defaultActiveKey={this.state.activeTab}
          onSelect={this.handleSelect}
          style={{
            borderRadius: "0px",
            backgroundColor: "rgba(0, 0, 0, 0.125)",
          }}
        >
          <Nav.Item>
            <Nav.Link eventKey="filter" style={{ borderRadius: "0px" }}>
              Filter
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="keywordsearch" style={{ borderRadius: "0px" }}>
              Keyword Search
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {this.state.activeTab === "filter" ? <Filter /> : null}
        {this.state.activeTab === "keywordsearch" ? (
          <div>keyword search</div>
        ) : null}
      </div>
    );
  }
}

export default Search;
