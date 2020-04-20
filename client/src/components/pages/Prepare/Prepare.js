import React from "react";
import PrepareForm from "./PrepareForm";
import EducationLevel from "./EducationLevel";
import { Nav } from "react-bootstrap";
import axios from "axios";
import CollegePrograms from "./CollegePrograms";
import Licenses from "./Licenses";
import Certifications from "./Certifications";
import { GetState } from "./ValidateLocation";
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`); //FOR SIDENAV

class Prepare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      user_inp: {
        Code: "11-9013.03",
        Occupation: "Aquacultural Managers",
        Location: "32601",
      },
      education_level: {
        educationLevelData: undefined,
      },
      college_programs: {
        collegeProgramsData: undefined,
      },
      licenses: {
        licensesData: undefined,
      },
      certifications: {
        certificationsData: undefined,
      },
      activeTab: "collegeprograms",
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

  componentDidMount() {
    this.getEducationLevels();
    this.getCollegePrograms();
  }

  handleSelect = (newTab) => {
    if (newTab !== this.state.activeTab) {
      this.setState({ activeTab: newTab });
    }
  };

  getCollegePrograms = async () => {
    try {
      const { data } = await axios({
        //500 mile radius, 100 records limit
        method: "get",
        url: `https://api.careeronestop.org/v1/training/${process.env.REACT_APP_USER_ID}/${this.state.user_inp.Code}/0/500/0/0/0/0/0/0/0/0/1000`,
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        },
      });
      this.setState({
        college_programs: {
          collegeProgramsData: data,
        },
      });
    } catch (e) {
      this.setState({
        college_program: {
          collegeProgramsData: null,
        },
      });
    }
  };

  getEducationLevels = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://api.careeronestop.org/v1/occupation/${process.env.REACT_APP_USER_ID}/${this.state.user_inp.Code}/${this.state.user_inp.Location}?training=true&interest=false&videos=false&tasks=false&dwas=false&wages=false&alternateOnetTitles=false&projectedEmployment=false&ooh=false&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false`,
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        },
      });
      this.setState({
        education_level: {
          educationLevelData: data,
        },
      });
    } catch (e) {
      this.setState({
        education_level: {
          educationLevelData: null,
        },
      });
    }
  };

  updateLocation = (e) => {
    this.setState({
      user_inp: { ...this.state.user_inp, Location: e.target.value },
    });
  };

  updateCareer = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    this.setState({
      user_inp: {
        ...this.state.user_inp,
        Code: e.target.options[selectedIndex].getAttribute("data-key"),
        Occupation: e.target.value,
      },
    });
  };

  render() {
    return (
      <Sidebar
        sidebar={
          <PrepareForm
            user_inp={this.state.user_inp}
            updateLocation={this.updateLocation}
            updateCareer={this.updateCareer}
            getEducationLevels={this.getEducationLevels}
            getCollegePrograms={this.getCollegePrograms}
          />
        }
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        styles={{
          root: {
            top: 56,
          },
          sidebar: {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <div className="prepare">
          {/* <EducationLevel education_level={this.state.education_level} />
        <br /> */}
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
                <Nav.Link
                  eventKey="collegeprograms"
                  style={{ borderRadius: "0px" }}
                >
                  College Programs
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="certifications"
                  style={{ borderRadius: "0px" }}
                >
                  Certifications
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="licenses" style={{ borderRadius: "0px" }}>
                  Lincenses
                </Nav.Link>
              </Nav.Item>
            </Nav>
            {this.state.activeTab === "collegeprograms" ? (
              <CollegePrograms college_programs={this.state.college_programs} />
            ) : null}
            {this.state.activeTab === "certifications" ? (
              <Certifications />
            ) : null}
            {this.state.activeTab === "licenses" ? <Licenses /> : null}
          </div>
          <br />
          <br />
        </div>
      </Sidebar>
    );
  }
}

export default Prepare;
