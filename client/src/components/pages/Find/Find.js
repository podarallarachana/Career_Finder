import React, { Fragment } from "react";
import Sidebar from "react-sidebar";
import { Nav } from "react-bootstrap";

const mql = window.matchMedia(`(min-width: 800px)`); //FOR SIDENAV

class Find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      activeTab: "quiz",
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  //THESE FUNCTIONS ARE FOR SETTING UP SIDEBAR
  UNSAFE_componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  handleSelect = (newTab) => {
    if (newTab !== this.state.activeTab) {
      this.setState({ activeTab: newTab });
    }
  };

  render() {
    return (
      <Sidebar
        sidebar={
          <div style={{ width: "250px", padding: "15px" }}>
            {this.state.activeTab === "quiz" ? <div>quiz</div> : null}
            {this.state.activeTab === "keyword" ? <div>keyword</div> : null}
            {this.state.activeTab === "filter" ? <div>filter</div> : null}
          </div>
        }
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        styles={{
          root: {
            top: 56,
          },
          sidebar: {
            backgroundColor: "#ff683c",
          },
        }}
      >
        <div className="prepare">
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
                <Nav.Link eventKey="quiz" style={{ borderRadius: "0px" }}>
                  Personality Quiz
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="keyword" style={{ borderRadius: "0px" }}>
                  Keyword Search
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="filter" style={{ borderRadius: "0px" }}>
                  Filter search
                </Nav.Link>
              </Nav.Item>
            </Nav>
            {this.state.activeTab === "quiz" ? <div>quiz</div> : null}
            {this.state.activeTab === "keyword" ? <div>keyword</div> : null}
            {this.state.activeTab === "filter" ? <div>filter</div> : null}
          </div>
          <br />
          <br />
        </div>
      </Sidebar>
    );
  }
}

export default Find;
