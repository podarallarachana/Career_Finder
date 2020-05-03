import React, { Fragment } from "react";
import findData from "./FindData.json";
import Card from "react-bootstrap/Card";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import CardColumns from "react-bootstrap/CardColumns";
import { LinkContainer } from "react-router-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-js-pagination";
import data from "../Explore/Data.json";

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
      activePage: 1,
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
          Selected: false,
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

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
  };

  displayDescription = (description) => {
    if (description.length < 150) {
      return description;
    } else {
      return description.substring(0, 147) + "...";
    }
  };

  getOccupation = (code) => {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].CareerPathway.length; j++) {
        for (var z = 0; z < data[i].CareerPathway[j].Jobs.length; z++) {
          if (data[i].CareerPathway[j].Jobs[z].Code === code) {
            return {
              occupation: data[i].CareerPathway[j].Jobs[z],
              pathway: data[i].CareerPathway[j].Pathway,
              cluster: data[i].CareerCluster,
            };
          }
        }
      }
    }
  };

  getColors = (number) => {
    var colors = [
      { light: "#fba465", medium: "#f86e51", dark: "#ee3e38" }, //orange
      { light: "#c0e6ff", medium: "#7cc7ff", dark: "#5aaafa" }, //blue
      { light: "#b4e051", medium: "#8cd211", dark: "#5aa700" }, //green
    ];
    var color = colors[0];

    if ("1470".indexOf(number[number.length - 1].toLowerCase()) > -1) {
      color = colors[0];
    } else if ("258".indexOf(number[number.length - 1].toLowerCase()) > -1) {
      color = colors[1];
    } else if ("369".indexOf(number[number.length - 1].toLowerCase()) > -1) {
      color = colors[2];
    }
    return color;
  };

  getRecommendations = async () => {
    this.setState({ activePage: 1 });
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
              label={
                <h6>
                  <b>{num}</b>
                  {". "}
                  <span className="font-weight-light">{title}</span>
                </h6>
              }
              checked={this.state[type]}
              onChange={() => this.onSwitchChange(type)}
            />
          ) : (
            <h6 className="font-weight-light">{title}</h6>
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
        <div
          className="row justify-content-center"
          style={{ paddingTop: "50px" }}
        >
          <Spinner animation="grow" />
        </div>
      );
    } else if (this.state.recommendations === null) {
      return <div>sorry, unavailable right now</div>;
    } else {
      return (
        <Fragment>
          <br />
          <div className="row justify-content-center">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={this.state.activePage}
              itemsCountPerPage={50}
              totalItemsCount={this.state.recommendations.SKARankList.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
          <div className="row">
            {this.state.recommendations.SKARankList.slice(
              (this.state.activePage - 1) * 50,
              (this.state.activePage - 1) * 50 + 50
            ).map((occupation, index) => {
              var color = this.getColors(index.toString());
              return (
                <div
                  key={occupation.OnetCode}
                  className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
                >
                  <Card style={{ marginBottom: "15px", border: "0px" }}>
                    <Card.Body
                      style={{
                        padding: "30px",
                      }}
                    >
                      <h4>
                        <span className="font-weight-light">
                          {" "}
                          {index + 1 + (this.state.activePage - 1) * 50}
                        </span>
                        .{" "}
                        {
                          this.getOccupation(occupation.OnetCode).occupation
                            .Occupation
                        }
                      </h4>
                      <small>
                        {this.getOccupation(occupation.OnetCode).pathway},{" "}
                        {this.getOccupation(occupation.OnetCode).cluster}{" "}
                      </small>
                      <hr />
                      <small>
                        <b>
                          <i
                            className="fa fa-circle"
                            aria-hidden="true"
                            style={{ color: color.light }}
                          ></i>{" "}
                          Description:{" "}
                        </b>
                        {this.displayDescription(
                          this.getOccupation(occupation.OnetCode).occupation
                            .Description
                        )}
                      </small>
                      <br />
                      <small>
                        <b>
                          <i
                            className="fa fa-circle"
                            aria-hidden="true"
                            style={{ color: color.medium }}
                          ></i>{" "}
                          Education:{" "}
                        </b>
                        {
                          this.getOccupation(occupation.OnetCode).occupation
                            .Education
                        }
                      </small>
                      <br />
                      <small>
                        <b>
                          <i
                            className="fa fa-circle"
                            aria-hidden="true"
                            style={{ color: color.dark }}
                          ></i>{" "}
                          Salary:{" "}
                        </b>
                        $
                        {this.getOccupation(occupation.OnetCode)
                          .occupation.Salary.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </small>
                      <br />
                      <br />
                      <div className="row justify-content-center">
                        <LinkContainer
                          to={"/explore/" + occupation.OnetCode}
                          style={{
                            border: "0px",
                            outline: "0px",
                            backgroundColor: color.light,
                            color: "white",
                          }}
                        >
                          <Button
                            className="optionsButton"
                            variant="primary btn-xs"
                            style={{
                              border: "0px",
                            }}
                          >
                            Learn More
                          </Button>
                        </LinkContainer>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
          <div className="row justify-content-center">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={this.state.activePage}
              itemsCountPerPage={50}
              totalItemsCount={this.state.recommendations.SKARankList.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
          <br />
        </Fragment>
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
        <Jumbotron className="filterheader" style={{ marginBottom: "0px" }}>
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
          {this.displayOptions("subjects", 1, "I am interested in", true, 0)}
          {this.displayOptions("skills", 2, "I am good at", true, 1)}
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
            padding: "15px",
          }}
        >
          {this.displayRecommendations()}
        </div>
      </div>
    );
  }
}

export default Quiz;
