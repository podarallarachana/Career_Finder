import React, { Fragment } from "react";
import { Nav } from "react-bootstrap";
import axios from "axios";

class Tabs extends React.Component {
  state = {
    data: undefined,
    activeTab: "learningModules"
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://reqres.in/api/unknown/2`
      });
      this.setState({ data: data });
    } catch (e) {
      this.setState({ data: null });
    }
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
        {this.state.activeTab === "interactiveTools" ? (
          <div>
            {this.state.data !== undefined || this.state.data !== null ? (
              <p>{this.state.data.data.id}</p>
            ) : (
              <p>NO</p>
            )}
          </div>
        ) : (
          <p>NO</p>
        )}
      </Fragment>
    );
  }
}

export default Tabs;
