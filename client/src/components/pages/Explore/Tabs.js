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
        url: `https://api.careeronestop.org/v1/occupation/${process.env.REACT_APP_USER_ID}/13-1021.00/US?training=true&interest=true&videos=true&tasks=true&dwas=true&wages=true&alternateOnetTitles=true&projectedEmployment=true&ooh=true&stateLMILinks=true&relatedOnetTitles=true&skills=true&knowledge=true&ability=true&trainingPrograms=true`,
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN
        }
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
              <p>{this.state.data.OccupationDetail[0].OnetTitle}</p>
            ) : (
              <p>NO</p>
            )}
          </div>
        ) : (
          <p>WHAT</p>
        )}
      </Fragment>
    );
  }
}

export default Tabs;
