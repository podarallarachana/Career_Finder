import React from "react";

const EducationLevel = props => {
  const displayEducationLevels = () => {
    return (
      <div>
        {props.education_level.educationLevelData.OccupationDetail[0].EducationTraining.EducationType.map(
          level => {
            console.log(level.EducationLevel);
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
            Recommended education level:{" "}
            {
              props.education_level.educationLevelData.OccupationDetail[0]
                .EducationTraining.EducationTitle
            }
          </p>
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
