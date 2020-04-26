import React, { Fragment } from "react";
import findData from "./FindData.json";
import Card from "react-bootstrap/Card";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import CardColumns from "react-bootstrap/CardColumns";

class Find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_inp: [],
      physical: false,
      technology: false,
      people: false,
      leader: false,
      recommendations: undefined,
      show: false,
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
        arr[i].Selected = false;
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
              label={<h5 className="font-weight-light">{title}</h5>}
              checked={this.state[type]}
              onChange={() => this.onSwitchChange(type)}
            />
          ) : (
            <h5 className="font-weight-light">{title}</h5>
          )}
          {!hasSwitch || (hasSwitch && this.state[type] === true) ? (
            <Fragment>
              {" "}
              {findData[0][type].map((data) => {
                return (
                  <Button
                    key={data.ElementName}
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
                );
              })}
              <br />
              <br />
            </Fragment>
          ) : null}
        </div>
      </div>
    );
  };

  displayRecommendations = () => {
    if (this.state.recommendations === undefined) {
      return <div>loading</div>;
    } else if (this.state.recommendations === null) {
      return <div>sorry, unavailable right now</div>;
    } else {
      return (
        <CardColumns>
          {this.state.recommendations.SKARankList.map((occupation) => {
            return (
              <Card key={occupation.OnetCode}>
                <Card.Body>
                  <h4 className="font-weight-light">
                    {occupation.OccupationTitle}
                  </h4>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      );
    }
  };

  validateAndFetch = () => {
    var tmp = false;
    for (var i = 0; i < this.state.user_inp.length; i++) {
      if (this.state.user_inp[i].Selected === true) {
        tmp = true;
        break;
      }
    }

    if (!tmp) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
      this.getRecommendations();
    }
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
          {this.state.show ? (
            <Alert
              variant="danger"
              onClose={() => this.setState({ show: false })}
              dismissible
            >
              <Alert.Heading>No Selections</Alert.Heading>
              <p>Make sure to select at least one option!</p>
            </Alert>
          ) : null}
          {this.displayOptions("subjects", 1, "I am interested in", false)}
          {this.displayOptions("skills", 2, "I am good at", false)}
          {this.displayOptions(
            "physical",
            3,
            "I like to work with my hands",
            true
          )}
          {this.displayOptions(
            "technology",
            4,
            "I like to work with these technologies",
            true
          )}
          {this.displayOptions("people", 5, "I like to work with people", true)}
          {this.displayOptions("leader", 6, "I want to be a leader", true)}
          <br />
          <Button
            onClick={this.validateAndFetch}
            style={{
              border: "0px",
              display: "table",
              margin: "0 auto",
            }}
          >
            Get Recommendations
          </Button>
        </Card>
        <br />
        {this.displayRecommendations()}
      </div>
    );
  }
}

export default Find;
