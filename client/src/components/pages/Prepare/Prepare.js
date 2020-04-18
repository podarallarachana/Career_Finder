import React from "react";
import PrepareForm from "./PrepareForm";
import EducationLevel from "./EducationLevel";
import { Nav } from "react-bootstrap";
import axios from "axios";
import CollegePrograms from "./CollegePrograms";
import Licenses from "./Licenses";
import Certifications from "./Certifications";
import { GetState } from "./ValidateLocation";

class Prepare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        url: `https://api.careeronestop.org/v1/training/${
          process.env.REACT_APP_USER_ID
        }/${this.state.user_inp.Code}/${GetState(
          this.state.user_inp.Location
        )}/500/0/0/0/0/0/0/0/0/1000`,
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
      <div className="prepare">
        <PrepareForm
          user_inp={this.state.user_inp}
          updateLocation={this.updateLocation}
          updateCareer={this.updateCareer}
          getEducationLevels={this.getEducationLevels}
          getCollegePrograms={this.getCollegePrograms}
        />
        <br />
        <EducationLevel education_level={this.state.education_level} />
        <br />
        <div style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}>
          <h5 className="font-weight-light">
            <b>Step 3: </b>Sta
          </h5>
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
    );
  }
}

export default Prepare;
