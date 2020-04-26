import React, { Fragment } from "react";
import findData from "./FindData.json";
import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

class Find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_inp: [],
      physical: false,
      technology: false,
      people: true,
      leader: false,
      recommendations: undefined,
    };
    var arr = [
      "skills",
      "subjects",
      "physical",
      "technology",
      "people",
      "leader",
    ];
    for (var j = 0; j < arr.length; j++) {
      for (var i = 0; i < findData[0][arr[j]].length; i++) {
        this.state.user_inp.push({
          ElementName: findData[0][arr[j]][i].ElementName,
          ElementId: findData[0][arr[j]][i].ElementId,
          Selected:
            findData[0][arr[j]][i].ElementName === "Science" ? true : false,
          OnVal: findData[0][arr[j]][i].DataPoint80,
          OffVal: findData[0][arr[j]][i].DataPoint20,
          Type: arr[j],
        });
      }
    }
  }

  componentDidMount() {
    this.getRecommendations();
  }

  getRecommendations = async () => {
    var tmp = { SKAValueList: [] };
    for (var i = 0; i < this.state.user_inp.length; i++) {
      var val =
        this.state.user_inp[i].Selected === true
          ? this.state.user_inp[i].OnVal
          : this.state.user_inp[i].OffVal;
      tmp.SKAValueList.push({
        ElementId: this.state.user_inp[i].ElementId,
        DataValue: val,
      });
    }
    console.log(tmp);
    this.setState({
      recommendations: undefined,
    });
    try {
      const { data } = await axios({
        method: "post",
        url: `https://api.careeronestop.org/v1/skillsmatcher/${process.env.REACT_APP_USER_ID}`,
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        },
        data: tmp,
      });
      this.setState({
        recommendations: data,
      });
    } catch (e) {
      this.setState({
        recommendations: null,
      });
    }
  };

  onUserInp = (e) => {
    var tmp = this.state.user_inp;
    var result = tmp.find((obj) => {
      return obj.ElementName === e.target.innerHTML;
    });
    var isSelected = result.Selected;
    result.Selected = !isSelected;
    this.setState({ user_inp: tmp });
  };

  onSwitchChange = (type) => {
    var tmp = this.state[type];
    var arr = this.state.user_inp;

    //RESET ALL ELEMENTS TO FALSE ON SWITCH CHANGE
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].Type === type) {
        var obj = arr[i];
        arr[i] = {
          ElementName: obj.ElementName,
          ElementId: obj.ElementId,
          Selected: false,
          OnVal: obj.DataPoint80,
          OffVal: obj.DataPoint20,
        };
      }
    }
    this.setState({ [type]: !tmp, user_inp: arr });
  };

  displayOptions = (type, num, title, hasSwitch) => {
    return (
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
          {hasSwitch ? (
            <Form.Check
              type="switch"
              id={"switch_" + num}
              label={<h6 className="font-weight-light">{title}</h6>}
              checked={this.state[type]}
              onChange={() => this.onSwitchChange(type)}
            />
          ) : (
            <h6 className="font-weight-light">{title}</h6>
          )}
          <br />
          {!hasSwitch || (hasSwitch && this.state[type] === true)
            ? findData[0][type].map((data) => {
                return (
                  <Fragment key={data.ElementName}>
                    <Button
                      onClick={this.onUserInp}
                      variant={
                        this.state.user_inp.find((obj) => {
                          return obj.ElementName === data.ElementName;
                        }).Selected === true
                          ? "primary btn-sm"
                          : "light btn-sm"
                      }
                      className="optionsButton"
                      title={data.Question}
                    >
                      {data.ElementName}
                    </Button>
                  </Fragment>
                );
              })
            : null}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="find">
        <Card style={{ padding: "15px" }}>
          <h1 className="font-weight-light">
            Find the perfect career for you!
          </h1>
          <h6 className="font-weight-light">
            <b>Instructions: </b> Answer at least one question to get
            recommendations. You can pick multiple options per question
          </h6>
          <br />
          {this.displayOptions("subjects", 1, "I am interested in", false)}
          <hr />
          {this.displayOptions("skills", 2, "I am good at", false)}
          <hr />
          {this.displayOptions(
            "physical",
            3,
            "I like to work with my hands",
            true
          )}
          <hr />
          {this.displayOptions(
            "technology",
            4,
            "I like to work with these technologies",
            true
          )}
          <hr />
          {this.displayOptions("people", 5, "I like to work with people", true)}
          <hr />
          {this.displayOptions("leader", 6, "I want to be a leader", true)}
        </Card>
      </div>
    );
  }
}

export default Find;
