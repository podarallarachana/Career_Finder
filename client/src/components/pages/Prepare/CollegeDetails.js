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

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return null;
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
            <h1>{school.SchoolName}</h1>
            <small>
              {school.Address}, <br />
              {school.City}, {school.StateAbbr}&nbsp;{school.Zip}
              <br />
              <b>
                <i className="fa fa-external-link" aria-hidden="true"></i>
                &nbsp;&nbsp;
                {school.SchoolUrl}
              </b>
              <br />
              <b>
                <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;
                {formatPhoneNumber(school.Phone)}
              </b>
            </small>
            <hr />
            <div className="row">
              <div className="col-12">
                <h3>
                  <b>{school.ProgramName}</b>
                </h3>
                <h3>
                  <b>
                    {school.ProgramLength.map((program) => {
                      return school.ProgramLength.indexOf(program) !== 0
                        ? " or " + program.Name
                        : program.Name;
                    })}
                  </b>
                </h3>
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <p>
                  <b>General Info</b>
                </p>
                <p>
                  Acceptance Rate:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.admissions.admission_rate.consumer_rate"
                  )}
                </p>
                <p>
                  Number of Students:&nbsp;
                  {displayProperty(school.ID, "latest.student.size")}
                </p>
                <p>
                  Graduation Rate:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.completion.consumer_rate"
                  )}
                </p>
                <p>
                  Cost of Attendance:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.cost.avg_net_price.overall"
                  )}
                </p>
                <p>
                  Average Salary after 10 Years:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.earnings.10_yrs_after_entry.median"
                  )}
                </p>
                <br />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <p>
                  <b>ACT Scores</b>
                </p>
                <p>
                  Cumulative:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.admissions.act_scores.midpoint.cumulative"
                  )}
                </p>
                <p>
                  English:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.admissions.act_scores.midpoint.english"
                  )}
                </p>
                <p>
                  Math:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.admissions.act_scores.midpoint.math"
                  )}
                </p>
                <p>
                  Writing:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.admissions.act_scores.midpoint.writing"
                  )}
                </p>
                <br />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <p>
                  <b>SAT Scores</b>
                </p>
                <p>
                  Overall:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.admissions.sat_scores.average.overall"
                  )}
                </p>
                <p>
                  Critical Reading:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.admissions.sat_scores.midpoint.critical_reading"
                  )}
                </p>
                <p>
                  Math:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.admissions.sat_scores.midpoint.math"
                  )}
                </p>
                <p>
                  Writing:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.admissions.sat_scores.midpoint.writing"
                  )}
                </p>
                <br />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <p>
                  <b>Gender Demographics</b>
                </p>
                <p>
                  Men:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.men"
                  )}
                </p>
                <p>
                  Women:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.women"
                  )}
                </p>
                <br />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <p>
                  <b>Race Demographics</b>
                </p>
                <p>
                  American Indian and Alaska Native:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.aian"
                  )}
                </p>
                <p>
                  Asian:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.asian"
                  )}
                </p>
                <p>
                  Asian Pacific Islander:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.asian_pacific_islande"
                  )}
                </p>
                <p>
                  Black:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.black"
                  )}
                </p>
                <p>
                  Black Non Hispanic:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.black_non_hispanic"
                  )}
                </p>
                <p>
                  Hispanic:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.hispanic"
                  )}
                </p>
                <p>
                  Native Hawaiians and Pacific Islanders:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.nhpi"
                  )}
                </p>
                <p>
                  Non Resident Alien:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.non_resident_alien"
                  )}
                </p>
                <p>
                  Two or More:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.two_or_more"
                  )}
                </p>
                <p>
                  Unknown:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.unknown"
                  )}
                </p>
                <p>
                  White:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.white"
                  )}
                </p>
                <p>
                  White Non Hispanic:&nbsp;
                  {displayProperty(
                    school.ID,
                    "latest.student.demographics.race_ethnicity.white_non_hispanic"
                  )}
                </p>
                <br />
              </div>
            </div>
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
