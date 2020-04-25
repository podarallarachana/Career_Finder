import React, { Fragment } from "react";
import Pagination from "react-js-pagination";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import CollegeDetails from "./CollegeDetails";

class CollegePrograms extends React.Component {
  showDetails = () => {
    let curr = this.state.showDetails;
    this.props.setShowCollegeDetails(!curr);
  };

  displayAcceptance = (college_id) => {
    college_id = college_id.substr(0, college_id.indexOf("-"));

    if (this.props.college_programs.collegeScorecardData === undefined) {
      return "loading";
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
          var tmp = "latest.admissions.admission_rate.consumer_rate";
          str = this.props.college_programs.collegeScorecardData.results[i][
            tmp
          ];
        }
      }
      return str;
    }
  };

  displayData = () => {
    if (this.props.college_programs.collegeProgramsData === undefined) {
      return <div>loading</div>;
    } else if (this.props.college_programs.collegeProgramsData === null) {
      return <div>sorry, unavailable right now</div>;
    } else {
      return (
        <Fragment>
          {!this.props.showCollegeDetails ? (
            <div className="colleges">
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={this.props.activePage}
                itemsCountPerPage={5}
                totalItemsCount={
                  this.props.college_programs.collegeProgramsData.SchoolPrograms
                    .length
                }
                pageRangeDisplayed={5}
                onChange={this.props.handlePageChange}
              />
              <CardColumns>
                {this.props.college_programs.collegeProgramsData.SchoolPrograms.slice(
                  (this.props.activePage - 1) * 5,
                  (this.props.activePage - 1) * 5 + 5
                ).map((school) => {
                  return (
                    <Card
                      key={school.ID}
                      onClick={this.props.setShowCollegeDetails}
                    >
                      <Card.Body>
                        <h4 className="font-weight-light">
                          {school.SchoolName}
                        </h4>
                        <small>
                          <b>
                            {school.City}, {school.StateAbbr}
                          </b>{" "}
                          {school.SchoolUrl}
                          <br />
                          <b>Acceptance Rate: </b>
                          {this.displayAcceptance(school.ID)}
                          <br />
                          <b>Size: </b> 1230 students
                          <br />
                          <b>Salary: </b> 12k - 134l
                        </small>
                        <hr />
                        <p>
                          <b>Program: </b>
                          {school.ProgramName}
                          <br />
                          <b>Duration: </b>
                          {school.ProgramLength.map((program) => {
                            return school.ProgramLength.indexOf(program) !== 0
                              ? " or " + program.Name
                              : program.Name;
                          })}
                        </p>
                      </Card.Body>
                    </Card>
                  );
                })}
              </CardColumns>
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={this.props.activePage}
                itemsCountPerPage={5}
                totalItemsCount={
                  this.props.college_programs.collegeProgramsData.SchoolPrograms
                    .length
                }
                pageRangeDisplayed={5}
                onChange={this.props.handlePageChange}
              />
            </div>
          ) : (
            <CollegeDetails
              showCollegeDetails={this.props.showCollegeDetails}
              setShowCollegeDetails={this.props.setShowCollegeDetails}
            />
          )}
        </Fragment>
      );
    }
  };

  render() {
    return <div>{this.displayData()}</div>;
  }
}

export default CollegePrograms;
