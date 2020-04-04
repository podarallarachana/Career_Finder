import React from "react";
import PrepareForm from "./PrepareForm";
import EducationLevel from "./EducationLevel";
import axios from "axios";

class Prepare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_inp: {
        Code: "11-9013.03",
        Occupation: "Aquacultural Managers",
        location: "32601"
      },
      education_level: {
        educationLevelData: undefined
      }
    };
  }

  componentDidMount() {
    this.getEducationLevels();
  }

  getEducationLevels = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://api.careeronestop.org/v1/occupation/${process.env.REACT_APP_USER_ID}/${this.state.user_inp.Code}/US?training=true&interest=false&videos=false&tasks=false&dwas=false&wages=false&alternateOnetTitles=false&projectedEmployment=false&ooh=false&stateLMILinks=false&relatedOnetTitles=false&skills=false&knowledge=false&ability=false&trainingPrograms=false`,
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN
        }
      });
      this.setState({
        education_level: {
          educationLevelData: data
        }
      });
      console.log(data);
    } catch (e) {
      this.setState({
        education_level: {
          educationLevelData: null
        }
      });
    }
  };

  updateLocation = e => {
    this.setState({
      user_inp: { ...this.state.user_inp, location: e.target.value }
    });
  };

  updateCareer = e => {
    const selectedIndex = e.target.options.selectedIndex;
    this.setState({
      user_inp: {
        ...this.state.user_inp,
        Code: e.target.options[selectedIndex].getAttribute("data-key"),
        Occupation: e.target.value
      }
    });
  };

  render() {
    return (
      <div className="prepare">
        <PrepareForm
          user_inp={this.state.user_inp}
          updateLocation={this.updateLocation}
          updateCareer={this.updateCareer}
        />
        <br />
        <EducationLevel education_level={this.state.education_level} />
      </div>
    );
  }
}

export default Prepare;
