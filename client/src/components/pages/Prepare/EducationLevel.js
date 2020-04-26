import React from "react";
import Card from "react-bootstrap/Card";
import { Doughnut } from "react-chartjs-2";

const EducationLevel = (props) => {
  const displayEducationLevels = () => {
    var values = [];
    for (
      var i = 0;
      i <
      props.education_level.educationLevelData.OccupationDetail[0]
        .EducationTraining.EducationType.length;
      i++
    ) {
      values.push(
        props.education_level.educationLevelData.OccupationDetail[0]
          .EducationTraining.EducationType[i].Value
      );
    }

    let graphData = {
      labels: [
        "Less than high school diploma",
        "High school diploma or equivalent",
        "Some college, no degree",
        "Associate's degree",
        "Bachelor's degree",
        "Master's degree",
        "Doctoral or professional degree",
      ],
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#c8f08f",
            "#b4e051",
            "#8cd211",
            "#5aa700",
            "#4c8400",
            "#2d660a",
            "#144d14",
          ],
        },
      ],
    };

    return (
      <div>
        <Doughnut
          options={{
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          }}
          data={graphData}
        />
      </div>
    );
  };

  const displayData = () => {
    if (props.education_level.educationLevelData === undefined) {
      return <div>loading</div>;
    } else if (props.education_level.educationLevelData === null) {
      return <div>sorry, unavailable right now</div>;
    } else {
      return (
        <div>
          {/* <h5 className="font-weight-light">
            <b>Step 2: </b>use the data to determine the best path for you
          </h5>
          <br />
          <p>
            <b>Most people in this career have a:</b>{" "}
            {
              props.education_level.educationLevelData.OccupationDetail[0]
                .EducationTraining.EducationTitle
            }
          </p>
          {props.education_level.educationLevelData.OccupationDetail[0]
            .EducationTraining.EducationTitle ===
            "Less than high school diploma" ||
          props.education_level.educationLevelData.OccupationDetail[0]
            .EducationTraining.EducationTitle ===
            "High school diploma or equivalent" ? (
            <p>
              <b>
                While a college degree may not be required for this career, we
                encourage you to explore all your options.
              </b>{" "}
              Use the certification, license, and college tools below to find
              some resources that will help you get started in your career.
            </p>
          ) : (
            <p>
              <b>
                College is strongly recommended for students hoping to pursue
                this career path.
              </b>{" "}
              Use the certification, license, and college tools below to find
              some resources that will help you get started in your career.
            </p>
          )}
          <hr /> */}
          {displayEducationLevels()}
        </div>
      );
    }
  };

  return <div style={{ width: "200px" }}>{displayData()}</div>;
};

export default EducationLevel;
