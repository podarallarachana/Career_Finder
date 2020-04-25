import React from "react";
import PrepareForm from "./PrepareForm";
// import EducationLevel from "./EducationLevel";
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
        Home: "off",
      },
      education_level: {
        educationLevelData: undefined,
      },
      college_programs: {
        collegeProgramsData: undefined,
        collegeScorecardData: undefined,
      },
      licenses: {
        licensesData: undefined,
      },
      certifications: {
        certificationsData: undefined,
      },
      activeTab: "collegeprograms",
      activePage: 1,
      showCollegeDetails: false,
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
    //this.getEducationLevels();
    this.getCollegePrograms();
  }

  handleSelect = (newTab) => {
    if (newTab !== this.state.activeTab) {
      this.setState({ activeTab: newTab });
    }
  };

  getCertifications = async () => {
    this.setState({
      certifications: {
        certificationsData: undefined,
      },
    });
    try {
      const { data } = await axios({
        method: "get",
        url: `https://api.careeronestop.org/v1/certificationfinder/${process.env.REACT_APP_USER_ID}/${this.state.user_inp.Code}/0/0/0/0/0/0/0/0/0/10`,
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        },
      });
      this.setState({
        certifications: {
          certificationsData: data,
        },
      });
      console.log(data);
    } catch (e) {
      this.setState({
        certifications: {
          certificationsData: null,
        },
      });
    }
  };

  getCollegePrograms = async () => {
    this.setState({
      college_programs: {
        collegeProgramsData: undefined,
      },
      activePage: 1,
    });
    try {
      const { data } = await axios({
        //500 mile radius, 6000 records limit
        method: "get",
        url: `https://api.careeronestop.org/v1/training/${
          process.env.REACT_APP_USER_ID
        }/${this.state.user_inp.Code}/${
          this.state.user_inp.Home === "on"
            ? 0
            : GetState(this.state.user_inp.Location)
        }/500/0/0/0/0/0/0/0/0/6000`,
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        },
      });
      this.setState({
        college_programs: {
          collegeProgramsData: data,
        },
        showCollegeDetails: false,
      });
      this.getCollegeScorecard();
    } catch (e) {
      this.setState({
        college_programs: {
          collegeProgramsData: null,
        },
        showCollegeDetails: false,
      });
    }
  };

  getCollegeScorecard = async () => {
    this.setState({
      college_programs: {
        ...this.state.college_programs,
        collegeScorecardData: undefined, //LOADING
      },
    });

    //CYCLE THROUGH ALL CARDS IN CURRENT PAGE AND GET SCORECARD DETAILS
    var college_ids = [];
    var id_str = "";

    var arr = this.state.college_programs.collegeProgramsData.SchoolPrograms;

    for (
      var i = (this.state.activePage - 1) * 100;
      (this.state.activePage - 1) * 100 + 100 < arr.length
        ? i < (this.state.activePage - 1) * 100 + 100
        : i < arr.length;
      i++
    ) {
      var id = arr[i].ID;
      var college_id = id.substr(0, id.indexOf("-"));

      if (!college_ids.includes(college_id)) {
        college_ids.push(college_id);
        id_str += college_id + ",";
      }
    }
    id_str = id_str.substring(0, id_str.length - 1);

    if (id_str !== "") {
      try {
        const { data } = await axios({
          method: "get",
          url: `https://cors-anywhere.herokuapp.com/https://api.data.gov/ed/collegescorecard/v1/schools/?api_key=${process.env.REACT_APP_TOKEN_SCORECARD}&id=${id_str}&per_page=100&fields=id,latest.admissions`,
        });
        this.setState({
          college_programs: {
            ...this.state.college_programs,
            collegeScorecardData: data,
          },
        });
      } catch (e) {
        this.setState({
          college_programs: {
            ...this.state.college_programs,
            collegeScorecardData: null, //NO DATA FOR ANY COLLEGES, ERROR COULD'VE OCCURED
          },
        });
      }
    } else {
      this.setState({
        college_programs: {
          ...this.state.college_programs,
          collegeScorecardData: null, //NO DATA FOR ANY COLLEGES, ERROR COULD'VE OCCURED
        },
      });
    }
  };

  //COME BACK TO THIS
  // getEducationLevels = async () => {
  //   this.setState({
  //     education_level: {
  //       educationLevelData: undefined,
  //     },
  //   });
  //   try {
  //     const { data } = await axios({
  //       method: "get",
  //       url: `https://api.careeronestop.org/v1/occupation/${process.env.REACT_APP_USER_ID}/${this.state.user_inp.Code}/${this.state.user_inp.Location}?training=true&interest=false&videos=false&tasks=false&dwas=false&wages=false&alternateOnetTitles=false&projectedEmployment=false&ooh=false&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false`,
  //       headers: {
  //         Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
  //       },
  //     });
  //     this.setState({
  //       education_level: {
  //         educationLevelData: data,
  //       },
  //     });
  //   } catch (e) {
  //     this.setState({
  //       education_level: {
  //         educationLevelData: null,
  //       },
  //     });
  //   }
  // };

  updateHome = (e) => {
    if (this.state.user_inp.Home !== e.target.value) {
      //turn on
      this.setState({
        user_inp: { ...this.state.user_inp, Home: "on" },
      });
    } else {
      //turn off
      this.setState({
        user_inp: { ...this.state.user_inp, Home: "off" },
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

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => this.getCollegeScorecard());
  };

  setShowCollegeDetails = () => {
    let tmp = this.state.showCollegeDetails;
    this.setState({ showCollegeDetails: !tmp });
  };

  render() {
    return (
      <Sidebar
        sidebar={
          <PrepareForm
            user_inp={this.state.user_inp}
            updateLocation={this.updateLocation}
            updateCareer={this.updateCareer}
            updateHome={this.updateHome}
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
                  onClick={() => this.getCertifications()}
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
              <CollegePrograms
                college_programs={this.state.college_programs}
                getCollegeScorecard={this.getCollegeScorecard}
                activePage={this.state.activePage}
                handlePageChange={this.handlePageChange}
                showCollegeDetails={this.state.showCollegeDetails}
                setShowCollegeDetails={this.setShowCollegeDetails}
              />
            ) : null}
            {this.state.activeTab === "certifications" ? (
              <Certifications certifications={this.state.certifications} />
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
