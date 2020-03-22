import React from "react";
import data from "./Data.json";
import Sidebar from "react-sidebar";
import SideNav from "./SideNav";
import Tabs from "./Tabs";
import OccupationOptions from "./OccupationOptions";

const mql = window.matchMedia(`(min-width: 800px)`); //FOR SIDENAV

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

  //SIDENAV USES THIS WHEN USER CLICKS ON DIFFERENT PATHWAYS
  updateActives = (newCluster, newPathway, newCode) => {
    this.setState({
      activeCluster: newCluster,
      activePathway: newPathway,
      activeOccupation: newCode
    });
  };

  //OCCUPATION-OPTIONS USES THIS
  updateActivePathway = pathway => {
    this.setState({ activePathway: pathway });
  };

  updateActiveOccupation = occupation => {
    this.setState({ activeOccupation: occupation });
  };

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
        <OccupationOptions
          activeCluster={this.state.activeCluster}
          activePathway={this.state.activePathway}
          activeOccupation={this.state.activeOccupation}
          updateActivePathway={this.updateActivePathway}
          updateActiveOccupation={this.updateActiveOccupation}
        />
        <Tabs activeCluster={this.state.activeCluster} />
        <div className="explore">
          {/* <h1 className="font-weight-light">Explore Careers</h1>
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button>
          <h1>{this.state.activeCluster}</h1>
          <h1>{this.state.activePathway}</h1>
          <h1>{this.state.activeOccupation}</h1> */}
        </div>
      </Sidebar>
    );
  }
}

export default Occupation;
