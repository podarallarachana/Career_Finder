import React, { Fragment } from "react";
import data from "./Data.json";
import Sidebar from "react-sidebar";
import SideNav from "./SideNav";
import Tabs from "./Tabs";
import { Jumbotron, Button } from "react-bootstrap";

const mql = window.matchMedia(`(min-width: 800px)`);

class Occupation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      activeCluster: "",
      activePathway: "",
      activeOccupation: ""
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() {
    this.intializeStateByParams();
  }

  intializeStateByParams() {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].CareerPathway.length; j++) {
        for (var z = 0; z < data[i].CareerPathway[j].Jobs.length; z++) {
          if (
            data[i].CareerPathway[j].Jobs[z].Code ===
            this.props.match.params.code
          ) {
            this.setState({
              activeCluster: data[i].CareerCluster,
              activePathway: data[i].CareerPathway[j].Pathway,
              activeOccupation: this.props.match.params.code
            });
            return;
          }
        }
      }
    }

    //COULD NOT FIND OCCUPATION ID IN CAREERONESTOP API
    this.setState({
      activeCluster: "INVALID",
      activePathway: "INVALID",
      activeOccupation: "INVALID"
    });
  }

  displayPathways = CareerCluster =>
    data.map(data => {
      if (CareerCluster === data.CareerCluster) {
        return (
          <div className="col-12" key={data.CareerCluster}>
            {data.CareerPathway.map(pathway => {
              return (
                <Fragment key={pathway.Pathway}>
                  <Button
                    onClick={() =>
                      this.setState({ activePathway: pathway.Pathway })
                    }
                    variant={
                      pathway.Pathway === this.state.activePathway
                        ? "primary btn-sm"
                        : "light btn-sm"
                    }
                    className="jumbatronButton"
                  >
                    {pathway.Pathway}
                  </Button>{" "}
                </Fragment>
              );
            })}
            <hr />
          </div>
        );
      } else {
        return null;
      }
    });

  displayOccupations = () => {
    if (this.state.activeCluster) {
      return (
        <div className="col-12" key={data.CareerCluster}>
          {data
            .find(x => x.CareerCluster === this.state.activeCluster)
            .CareerPathway.find(x => x.Pathway === this.state.activePathway)
            .Jobs.map(job => {
              return (
                <Fragment key={job.Code}>
                  <Button
                    variant={
                      job.Code === this.state.activeOccupation
                        ? "primary btn-sm"
                        : "outline-primary btn-sm"
                    }
                    className="jumbatronButton"
                  >
                    {job.Occupation}
                  </Button>{" "}
                </Fragment>
              );
            })}{" "}
        </div>
      );
    } else {
      return null;
    }
  };

  updateActives = (newCluster, newPathway, newCode) => {
    this.setState({
      activeCluster: newCluster,
      activePathway: newPathway,
      activeOccupation: newCode
    });
  };

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

  render() {
    return (
      <Sidebar
        sidebar={
          <SideNav
            activeCluster={this.state.activeCluster}
            updateActives={this.updateActives}
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
            {this.displayPathways(this.state.activeCluster)}
            {this.displayOccupations(
              this.state.activeCluster,
              this.state.activePathway
            )}
          </div>
        </Jumbotron>
        <Tabs activeCluster={this.state.activeCluster} />
        <div className="explore">
          <h1 className="font-weight-light">Explore Careers</h1>
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button>
          <h1>{this.state.activeCluster}</h1>
          <h1>{this.state.activePathway}</h1>
          <h1>{this.state.activeOccupation}</h1>
        </div>
      </Sidebar>
    );
  }
}

export default Occupation;
