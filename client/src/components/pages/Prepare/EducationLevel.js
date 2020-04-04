import React from "react";

const EducationLevel = props => {
  const displayEducationLevels = () => {
    return (
      <div>
        {props.education_level.educationLevelData.OccupationDetail[0].EducationTraining.EducationType.map(
          level => {
            return (
              <p key={level.EducationLevel}>
                {level.EducationLevel} {level.Value}
              </p>
            );
          }
        )}
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
          <h5 className="font-weight-light">
            <b>Step 2: </b>use the data to determine the best path for you
          </h5>
          <p>
            Recommended Education Level:{" "}
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
              While a college degree may not be required for this career, it is
              still important to have a High School Diploma. We recommend using
              the certifications, experience, and training tools below to find
              some resources that will help you get started in this career.
            </p>
          ) : (
            <p>
              College is strongly recommended for students hoping to pursue this
              career path. Use the college selection tool below to find the
              perfect college program and tips to prepare.
            </p>
          )}
          {displayEducationLevels()}
        </div>
      );
    }
  };

  return (
    <div className="row">
      <div className="col-12">{displayData()}</div>
    </div>
  );
};

export default EducationLevel;
