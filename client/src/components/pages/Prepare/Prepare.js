import React, { Fragment } from "react";
import PrepareForm from "./PrepareForm";
// import EducationLevel from "./EducationLevel";
import { Nav } from "react-bootstrap";
import axios from "axios";
import CollegePrograms from "./CollegePrograms";
import Licenses from "./Licenses";
import Certifications from "./Certifications";
import { GetState } from "./ValidateLocation";
import Jumbotron from "react-bootstrap/Jumbotron";

class Prepare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      showCollegeDetails: -1,
    };
  }

  componentDidMount() {
    //this.getEducationLevels();
    this.getCollegePrograms();
    this.getCertifications();
    this.getLicenses();
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
        url: `https://api.careeronestop.org/v1/certificationfinder/${process.env.REACT_APP_USER_ID}/${this.state.user_inp.Code}/0/0/0/0/0/0/0/0/0/6000`,
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        },
      });
      this.setState({
        certifications: {
          certificationsData: data,
        },
      });
    } catch (e) {
      this.setState({
        certifications: {
          certificationsData: null,
        },
      });
    }
  };

  getLicenses = async () => {
    this.setState({
      licenses: {
        licensesData: undefined,
      },
    });
    try {
      const { data } = await axios({
        method: "get",
        url: `https://api.careeronestop.org/v1/license/${
          process.env.REACT_APP_USER_ID
        }/${this.state.user_inp.Code}/${
          this.state.user_inp.Home === "on"
            ? "US"
            : GetState(this.state.user_inp.Location)
        }/0/0/0/6000?searchMode=literal`,
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        },
      });
      this.setState({
        licenses: {
          licensesData: data,
        },
      });
    } catch (e) {
      this.setState({
        licenses: {
          licensesData: null,
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
        timeout: 1000 * 30, // Wait for 5 seconds
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        },
      });
      this.setState({
        college_programs: {
          collegeProgramsData: data,
        },
        showCollegeDetails: -1,
      });
      this.getCollegeScorecard();
    } catch (e) {
      this.setState({
        college_programs: {
          collegeProgramsData: null,
        },
        showCollegeDetails: -1,
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

    if (this.state.college_programs.collegeProgramsData !== undefined) {
      var arr = this.state.college_programs.collegeProgramsData.SchoolPrograms;

      for (
        var i = (this.state.activePage - 1) * 50;
        (this.state.activePage - 1) * 50 + 50 < arr.length
          ? i < (this.state.activePage - 1) * 50 + 50
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
    }

    if (id_str !== "") {
      try {
        const { data } = await axios({
          method: "get",
          url: `https://api.data.gov/ed/collegescorecard/v1/schools/?api_key=${process.env.REACT_APP_TOKEN_SCORECARD}&id=${id_str}&per_page=50&fields=id,latest`,
        });
        this.setState({
          college_programs: {
            ...this.state.college_programs,
            collegeScorecardData: data,
          },
        });
        console.log(data);
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

  setShowCollegeDetails = (id) => {
    this.setState({ showCollegeDetails: id });
  };

  render() {
    return (
      <Fragment>
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
                  Licenses
                </Nav.Link>
              </Nav.Item>
            </Nav>{" "}
            <Jumbotron className="filterheader" style={{ marginBottom: "0px" }}>
              <div className="row justify-content-center">
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6">
                  <PrepareForm
                    user_inp={this.state.user_inp}
                    updateLocation={this.updateLocation}
                    updateCareer={this.updateCareer}
                    updateHome={this.updateHome}
                    getEducationLevels={this.getEducationLevels}
                    getCollegePrograms={this.getCollegePrograms}
                    getCertifications={this.getCertifications}
                    getLicenses={this.getLicenses}
                  />
                </div>
              </div>
            </Jumbotron>
            {this.state.activeTab === "collegeprograms" ? (
              <CollegePrograms
                college_programs={this.state.college_programs}
                activePage={this.state.activePage}
                handlePageChange={this.handlePageChange}
                showCollegeDetails={this.state.showCollegeDetails}
                setShowCollegeDetails={this.setShowCollegeDetails}
              />
            ) : null}
            {this.state.activeTab === "certifications" ? (
              <Certifications certifications={this.state.certifications} />
            ) : null}
            {this.state.activeTab === "licenses" ? (
              <Licenses licenses={this.state.licenses} />
            ) : null}
          </div>
          <br />
          <br />
        </div>
      </Fragment>
    );
  }
}

export default Prepare;
