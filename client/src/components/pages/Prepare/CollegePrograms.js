import React, { Fragment } from "react";
import Pagination from "react-js-pagination";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

class CollegePrograms extends React.Component {
  constructor(props) {
    super(props);
  }

  displayData = () => {
    if (this.props.college_programs.collegeProgramsData === undefined) {
      return <div>loading</div>;
    } else if (this.props.college_programs.collegeProgramsData === null) {
      return <div>sorry, unavailable right now</div>;
    } else {
      return (
        <Fragment>
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
                  <Card key={school.ID}>
                    <Card.Body>
                      <h3 className="font-weight-light">Education</h3>
                      <h1>{school.SchoolName}</h1>
                      <h1>{school.ProgramName}</h1>
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
        </Fragment>
      );
    }
  };

  displayCollegeList = () => {};

  render() {
    return <div>{this.displayData()}</div>;
  }
}

export default CollegePrograms;
