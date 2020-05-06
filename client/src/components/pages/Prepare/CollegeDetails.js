import React from "react";
import Card from "react-bootstrap/Card";
import { Alert, Button, Spinner } from "react-bootstrap";

const CollegeDetails = (props) => {
  const displayProperty = (college_id, propertyName) => {
    college_id = college_id.substr(0, college_id.indexOf("-"));

    if (props.college_programs.collegeScorecardData === undefined) {
      return "loading...";
    } else if (props.college_programs.collegeScorecardData === null) {
      return "n/a";
    } else {
      var str = "n/a";
      for (
        var i = 0;
        i < props.college_programs.collegeScorecardData.results.length;
        i++
      ) {
        if (
          props.college_programs.collegeScorecardData.results[
            i
          ].id.toString() === college_id
        ) {
          str =
            props.college_programs.collegeScorecardData.results[i][
              propertyName
            ];
        }
      }
      return str;
    }
  };

  const displayData = () => {
    if (props.college_programs.collegeProgramsData === undefined) {
      return (
        <div className="colleges">
          <div className="row justify-content-center">
            <Spinner animation="grow" />
          </div>
        </div>
      );
    } else if (props.college_programs.collegeProgramsData === null) {
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
      var school = props.college_programs.collegeProgramsData.SchoolPrograms.find(
        (school) => school.ID === props.showCollegeDetails
      );
      return (
        <Card style={{ borderRadius: "0px", marginTop: "15px" }}>
          <Card.Body
            style={{
              padding: "30px",
            }}
          >
            {school.SchoolName}
          </Card.Body>
        </Card>
      );
    }
  };

  return (
    <div className="colleges">
      <div className="row justify-content-center">
        <Button
          variant="primary btn-xs"
          onClick={() => props.setShowCollegeDetails(-1)}
          className="optionsButton"
        >
          <i
            className="fa fa-chevron-circle-left"
            aria-hidden="true"
            style={{ color: "white" }}
          ></i>
          &nbsp;&nbsp;Go Back
        </Button>
      </div>
      {displayData()}
    </div>
  );
};

export default CollegeDetails;
