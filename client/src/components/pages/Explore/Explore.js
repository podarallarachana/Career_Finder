import React, { Fragment } from "react";
import data from "./Data.json";
import Sidebar from "react-sidebar";
import NavigationBar from "../../shared/Nav";
import SideNav from "./SideNav";
import Tabs from "./Tabs";
import { Jumbotron, Button } from "react-bootstrap";

const mql = window.matchMedia(`(min-width: 800px)`);

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      activeCluster: "Agriculture, Food & Natural Resources"
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  displayData = data.map(data => {
    return (
      <div key={data.CareerCluster}>
        <h1>{data.CareerCluster}</h1>
        {data.CareerPathway.map(pathway => {
          return <p key={pathway.Pathway}>{pathway.Pathway}</p>;
        })}
      </div>
    );
  });

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

  updateActiveCluster = newCluster => {
    this.setState({ activeCluster: newCluster });
  };

  render() {
    return (
      <Fragment>
        <Sidebar
          sidebar={
            <SideNav
              activeCluster={this.state.activeCluster}
              updateActiveCluster={this.updateActiveCluster}
            />
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          <NavigationBar />
          <Jumbotron style={{ marginBottom: "0px" }}>
            <h1 className="font-weight-light">{this.state.activeCluster}</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <Tabs activeCluster={this.state.activeCluster} />
          <div className="explore">
            <h1 className="font-weight-light">Explore Careers</h1>
            <button onClick={() => this.onSetSidebarOpen(true)}>
              Open sidebar
            </button>
            {this.displayData}
          </div>
        </Sidebar>
      </Fragment>
    );
  }
}

export default Explore;
