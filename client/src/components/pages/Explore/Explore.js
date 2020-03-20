import React, { Fragment } from "react";
import data from "./Data.json";
import Sidebar from "react-sidebar";
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

  displayOccupations = CareerCluster =>
    data.map(data => {
      if (CareerCluster === data.CareerCluster) {
        return (
          <div className="col-12" key={data.CareerCluster}>
            {data.CareerPathway.map(pathway => {
              return (
                <Fragment key={pathway.Pathway}>
                  <Button variant="primary btn-sm" className="jumbatronButton">
                    {pathway.Pathway}
                  </Button>{" "}
                </Fragment>
              );
            })}
          </div>
        );
      } else {
        return null;
      }
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
        styles={{
          root: {
            top: 56
          },
          sidebar: {
            backgroundColor: "#ffffff"
          }
        }}
      >
        <Jumbotron style={{ marginBottom: "0px" }}>
          <h1 className="font-weight-light">{this.state.activeCluster}</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <div className="row justify-content-center">
            {this.displayOccupations(this.state.activeCluster)}
          </div>
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
    );
  }
}

export default Explore;
