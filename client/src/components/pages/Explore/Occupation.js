import React, { Fragment } from "react";
import data from "./Data.json";
import Sidebar from "react-sidebar";
import SideNav from "./SideNav";
import Tabs from "./Tabs";
import axios from "axios";
import OccupationOptions from "./OccupationOptions";

const mql = window.matchMedia(`(min-width: 800px)`); //FOR SIDENAV

class Occupation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      activeCluster: "Search",
      activePathway: undefined,
      activeOccupation: undefined,
      data: undefined
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() {
    if (window.location.pathname !== "/explore/search") {
      this.intializeStateByParams();
    }
  }

  getData = async () => {
    if (this.state.activeCluster !== "Search") {
      try {
        const { data } = await axios({
          method: "get",
          url: `https://api.careeronestop.org/v1/occupation/${process.env.REACT_APP_USER_ID}/${this.state.activeOccupation}/US?training=true&interest=true&videos=true&tasks=true&dwas=true&wages=true&alternateOnetTitles=true&projectedEmployment=true&ooh=true&stateLMILinks=true&relatedOnetTitles=true&skills=true&knowledge=true&ability=true&trainingPrograms=true`,
          headers: {
            Authorization: "Bearer " + process.env.REACT_APP_TOKEN
          }
        });
        this.setState({ data: data });
      } catch (e) {
        this.setState({ data: null });
      }
    }
  };

  intializeStateByParams() {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].CareerPathway.length; j++) {
        for (var z = 0; z < data[i].CareerPathway[j].Jobs.length; z++) {
          if (
            data[i].CareerPathway[j].Jobs[z].Code ===
            this.props.match.params.code
          ) {
            this.setState(
              {
                activeCluster: data[i].CareerCluster,
                activePathway: data[i].CareerPathway[j].Pathway,
                activeOccupation: this.props.match.params.code
              },
              () => this.getData()
            );
            return;
          }
        }
      }
    }

    //COULD NOT FIND OCCUPATION ID IN CAREERONESTOP API
    this.setState({
      activeCluster: "INVALID",
      activePathway: "INVALID",
      activeOccupation: "INVALID",
      data: null
    });
  }

  //SIDENAV USES THIS WHEN USER CLICKS ON DIFFERENT PATHWAYS
  updateActives = (newCluster, newPathway, newCode) => {
    this.setState(
      {
        activeCluster: newCluster,
        activePathway: newPathway,
        activeOccupation: newCode,
        data: undefined
      },
      () => this.getData()
    );
  };

  //OCCUPATION-OPTIONS USES THIS
  updateActivePathway = pathway => {
    this.setState({ activePathway: pathway });
  };

  updateActiveOccupation = occupation => {
    this.setState({ activeOccupation: occupation, data: undefined }, () =>
      this.getData()
    );
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
        {this.state.activeCluster !== "Search" ? (
          <Fragment>
            <OccupationOptions
              activeCluster={this.state.activeCluster}
              activePathway={this.state.activePathway}
              activeOccupation={this.state.activeOccupation}
              updateActivePathway={this.updateActivePathway}
              updateActiveOccupation={this.updateActiveOccupation}
            />
            <Tabs data={this.state.data} />
          </Fragment>
        ) : (
          <h1>Search</h1>
        )}
      </Sidebar>
    );
  }
}

export default Occupation;
