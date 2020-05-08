import React, { Fragment } from "react";
import Pagination from "react-js-pagination";
import Card from "react-bootstrap/Card";
import CollegeDetails from "./CollegeDetails";
import Spinner from "react-bootstrap/Spinner";
import { Alert, Button } from "react-bootstrap";

class CollegePrograms extends React.Component {
  showDetails = (num) => {
    let curr = this.props.showCollegeDetails;
    if (curr === -1) {
      this.props.setShowCollegeDetails(num);
    } else {
      this.props.setShowCollegeDetails(-1);
    }
  };

  displayProperty = (college_id, propertyName) => {
    college_id = college_id.substr(0, college_id.indexOf("-"));

    if (this.props.college_programs.collegeScorecardData === undefined) {
      return "loading...";
    } else if (this.props.college_programs.collegeScorecardData === null) {
      return "n/a";
    } else {
      var str = "n/a";
      for (
        var i = 0;
        i < this.props.college_programs.collegeScorecardData.results.length;
        i++
      ) {
        if (
          this.props.college_programs.collegeScorecardData.results[
            i
          ].id.toString() === college_id
        ) {
          str = this.props.college_programs.collegeScorecardData.results[i][
            propertyName
          ];
        }
      }
      return str;
    }
  };

  getColors = (number) => {
    var colors = [
      { light: "#7691d5", medium: "#3c62c3", dark: "#1e3163" }, //navy
      { light: "#00ace6", medium: "#0086b3", dark: "#006486" }, //blue
      { light: "#00d6e6", medium: "#00a7b3", dark: "#00828c" }, //green
    ];
    var color = colors[0];

    if ("0123456789".indexOf(number[number.length - 1].toLowerCase()) > -1) {
      color = colors[0];
    } else if ("258".indexOf(number[number.length - 1].toLowerCase()) > -1) {
      color = colors[1];
    } else if ("369".indexOf(number[number.length - 1].toLowerCase()) > -1) {
      color = colors[2];
    }
    return color;
  };

  displayData = () => {
    if (this.props.college_programs.collegeProgramsData === undefined) {
      return (
        <div className="colleges">
          <div
            className="row justify-content-center"
            style={{ padding: "40px" }}
          >
            <Spinner animation="grow" variant="primary" />
          </div>
        </div>
      );
    } else if (this.props.college_programs.collegeProgramsData === null) {
      return (
        <div className="colleges">
          <div className="row justify-content-center">
            <div className="col-12">
              <Alert variant="danger">
                <Alert.Heading>Not Available</Alert.Heading>
                <p>
                  Try again, the connection may be weak or your parameters may
                  be too specific.
                </p>
              </Alert>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Fragment>
          {this.props.showCollegeDetails === -1 ? (
            <div className="colleges">
              <div className="row justify-content-center">
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={this.props.activePage}
                  itemsCountPerPage={50}
                  totalItemsCount={
                    this.props.college_programs.collegeProgramsData
                      .SchoolPrograms.length
                  }
                  pageRangeDisplayed={5}
                  onChange={this.props.handlePageChange}
                />
              </div>
              <div className="row">
                {this.props.college_programs.collegeProgramsData.SchoolPrograms.slice(
                  (this.props.activePage - 1) * 50,
                  (this.props.activePage - 1) * 50 + 50
                ).map((school, index) => {
                  var color = this.getColors(index.toString());
                  return (
                    <div
                      key={school.ID}
                      className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
                    >
                      <Card
                        style={{ borderRadius: "0px", marginBottom: "15px" }}
                      >
                        <Card.Body
                          style={{
                            padding: "30px",
                          }}
                        >
                          <h4>
                            <span className="font-weight-light">
                              {index + 1 + (this.props.activePage - 1) * 50}
                            </span>
                            . {school.SchoolName}
                          </h4>
                          <small>
                            <b>
                              {school.City}, {school.StateAbbr}
                            </b>{" "}
                            {school.SchoolUrl}
                          </small>
                          <hr />
                          <small>
                            <b>Program: </b>
                            {school.ProgramName}
                          </small>
                          <br />
                          <small>
                            <b>Duration:&nbsp;</b>
                            {school.ProgramLength.map((program) => {
                              return school.ProgramLength.indexOf(program) !== 0
                                ? " or " + program.Name
                                : program.Name;
                            })}
                          </small>
                          <br />
                          <small>
                            <b>Acceptance Rate: </b>
                            {this.displayProperty(
                              school.ID,
                              "latest.admissions.admission_rate.consumer_rate"
                            ) !== "n/a" &&
                            this.displayProperty(
                              school.ID,
                              "latest.admissions.admission_rate.consumer_rate"
                            ) !== "loading..."
                              ? Math.round(
                                  this.displayProperty(
                                    school.ID,
                                    "latest.admissions.admission_rate.consumer_rate"
                                  ) * 100
                                ) + "%"
                              : this.displayProperty(
                                  school.ID,
                                  "latest.admissions.admission_rate.consumer_rate"
                                )}
                          </small>
                          <br />
                          <small>
                            <b>Size: </b>
                            {this.displayProperty(
                              school.ID,
                              "latest.student.size"
                            )}
                          </small>
                          <br />
                          <br />
                          <div className="row justify-content-center">
                            <Button
                              className="optionsButton"
                              variant="primary btn-xs"
                              onClick={() => this.showDetails(school.ID)}
                            >
                              Learn More
                            </Button>
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
                  activePage={this.props.activePage}
                  itemsCountPerPage={50}
                  totalItemsCount={
                    this.props.college_programs.collegeProgramsData
                      .SchoolPrograms.length
                  }
                  pageRangeDisplayed={5}
                  onChange={this.props.handlePageChange}
                />
              </div>
            </div>
          ) : (
            <CollegeDetails
              setShowCollegeDetails={this.props.setShowCollegeDetails}
              college_programs={this.props.college_programs}
              showCollegeDetails={this.props.showCollegeDetails}
            />
          )}
        </Fragment>
      );
    }
  };

  render() {
    return this.displayData();
  }
}

export default CollegePrograms;
