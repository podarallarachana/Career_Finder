import React, { Fragment } from "react";
import findData from "./FindData.json";
import Card from "react-bootstrap/Card";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import CardColumns from "react-bootstrap/CardColumns";
import { LinkContainer } from "react-router-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";

class Quiz extends React.Component {
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

  displayOptions = (type, num, title, hasSwitch, position) => {
    return (
      <div
        className="row justify-content-center"
        style={{
          marginLeft: "15px",
          marginRight: "15px",
        }}
      >
        <div
          className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6"
          style={{
            paddingTop: position === 0 ? "0px" : "15px",
            // borderTopLeftRadius: position === 0 ? "10px" : "0px",
            // borderTopRightRadius: position === 0 ? "10px" : "0px",
            paddingBottom: position === 5 ? "40px" : "0px",
            paddingLeft: "40px",
            paddingRight: "40px",
            backgroundColor: "white",
          }}
        >
          {hasSwitch ? (
            <Form.Check
              type="switch"
              id={"switch_" + num}
              label={<p>{title}</p>}
              checked={this.state[type]}
              onChange={() => this.onSwitchChange(type)}
            />
          ) : (
            <p>{title}</p>
          )}
          {!hasSwitch || (hasSwitch && this.state[type] === true) ? (
            <Fragment>
              {findData[0][type].map((data) => {
                return (
                  <Button
                    style={{ margin: "0px 4px 4px 0px" }}
                    key={data.ElementName}
                    onClick={this.onUserInp}
                    variant={
                      this.state.user_inp.find((obj) => {
                        return obj.ElementName === data.ElementName;
                      }).Selected === true
                        ? "warning btn-xs"
                        : "light btn-xs"
                    }
                    className="optionsButton"
                    title={data.Question}
                  >
                    {data.ElementName}
                  </Button>
                );
              })}
            </Fragment>
          ) : null}
        </div>
      </div>
    );
  };

  displayRecommendations = () => {
    if (this.state.recommendations === undefined) {
      return (
        <div className="row justify-content-center">
          <Spinner animation="grow" />
        </div>
      );
    } else if (this.state.recommendations === null) {
      return <div>sorry, unavailable right now</div>;
    } else {
      var colors = ["#d1193e", "#ee3e38", "#f86e51", "#fba465"];

      return (
        <CardColumns>
          {this.state.recommendations.SKARankList.map((occupation) => {
            var color = colors[0];
            if (
              "a".indexOf(occupation.OccupationTitle.charAt(0).toLowerCase()) >
              -1
            ) {
              color = colors[0];
            } else if (
              "bcd".indexOf(
                occupation.OccupationTitle.charAt(0).toLowerCase()
              ) > -1
            ) {
              color = colors[1];
            } else if (
              "efghijklmn".indexOf(
                occupation.OccupationTitle.charAt(0).toLowerCase()
              ) > -1
            ) {
              color = colors[2];
            } else {
              color = colors[3];
            }
            return (
              <LinkContainer
                to={"/explore/" + occupation.OnetCode}
                key={occupation.OnetCode}
                style={{ border: "0px", outline: "0px" }}
              >
                <Card>
                  <Card.Body style={{ backgroundColor: color, color: "white" }}>
                    <h4>{occupation.OccupationTitle}</h4>
                    <Button
                      variant="outline-light btn-xs"
                      className="optionsButton"
                    >
                      Learn More
                    </Button>
                  </Card.Body>
                  <Button
                    variant="light"
                    style={{
                      borderRadius: "0px",
                      width: "100%",
                      height: "100px",
                      backgroundColor: "white",
                    }}
                  >
                    <small>
                      <b>Education: </b>
                      {occupation.TypicalEducation}
                    </small>
                    <br />
                    <small>
                      <b>Salary: </b>$
                      {occupation.AnnualWages.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </small>
                  </Button>
                </Card>
              </LinkContainer>
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
      <div>
        <Jumbotron className="filterheader">
          <div
            className="row justify-content-center"
            style={{ marginLeft: "15px", marginRight: "15px" }}
          >
            <div
              className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6"
              style={{
                padding: "40px 40px 0px 40px",
                margin: "0px",
                backgroundColor: "white",
              }}
            >
              <h1 style={{ color: "#f2c246" }}>
                <b>
                  <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                  &nbsp;QUIZ
                </b>
              </h1>
              <p style={{ color: "#f2c246" }}>
                <b>Instructions</b>: Answer at least one question to get
                results. You can pick multiple options per question.
              </p>
            </div>
          </div>
          {this.displayOptions("subjects", 1, "I am interested in", false, 0)}
          {this.displayOptions("skills", 2, "I am good at", false, 1)}
          {this.displayOptions(
            "physical",
            3,
            "I like to work with my hands",
            true,
            2
          )}
          {this.displayOptions(
            "technology",
            4,
            "I like to work with these technologies",
            true,
            3
          )}
          {this.displayOptions(
            "people",
            5,
            "I like to work with people",
            true,
            4
          )}
          {this.displayOptions("leader", 6, "I want to be a leader", true, 5)}
          <div
            className="row justify-content-center"
            style={{ marginLeft: "15px", marginRight: "15px" }}
          >
            <div
              className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6"
              style={{ padding: "0px", margin: "0px" }}
            >
              {this.state.show ? (
                <Alert
                  style={{ margin: "0px", borderRadius: "0px" }}
                  variant="warning"
                  onClose={() => this.setState({ show: false })}
                  dismissible
                >
                  <Alert.Heading>No Selections</Alert.Heading>
                  <p>Make sure to select at least one option!</p>
                </Alert>
              ) : null}
              <Button
                onClick={this.validateAndFetch}
                variant="warning"
                style={{
                  display: "table",
                  width: "100%",
                  height: "70px",
                  borderRadius: "0px",
                }}
              >
                Get Recommendations
              </Button>
            </div>
          </div>
        </Jumbotron>
        <div
          style={{
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingBottom: "15px",
          }}
        >
          {this.displayRecommendations()}
        </div>
      </div>
    );
  }
}

export default Quiz;
