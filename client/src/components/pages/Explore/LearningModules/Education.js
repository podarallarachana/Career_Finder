import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Pie } from "react-chartjs-2";

const Education = props => {
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    var values = [];
    for (
      var i = 0;
      i < props.data.OccupationDetail[0].EducationTraining.EducationType.length;
      i++
    ) {
      values.push(
        props.data.OccupationDetail[0].EducationTraining.EducationType[i].Value
      );
    }
    setGraphData({
      labels: [
        "Less than high school diploma",
        "High school diploma or equivalent",
        "Some college, no degree",
        "Associate's degree",
        "Bachelor's degree",
        "Master's degree",
        "Doctoral or professional degree"
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
            "#144d14"
          ]
        }
      ]
    });
  }, [props.data.OccupationDetail]);

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 sections">
      <Card style={{ border: "0px" }}>
        <Card.Body>
          <h3 className="font-weight-light">Education</h3>
          <h6 className="font-weight-light">
            {props.data.OccupationDetail[0].EducationTraining.EducationTitle}
          </h6>
          <hr />
          <p>
            <b>All Levels{<br />}</b>
            See what education level different employees in the industry have.
            How many years are you willing to stay in school?
          </p>
          <div>
            <Pie
              options={{
                title: {
                  display: false
                },
                legend: {
                  display: false
                }
              }}
              data={graphData}
            />
          </div>
          <hr />
          <h6>How long does it take to complete?</h6>
          <h6 className="font-weight-light">
            Less than high school diploma (0-4 years)
          </h6>
          <h6 className="font-weight-light">
            High school diploma or equivalent (4 years)
          </h6>
          <h6 className="font-weight-light">
            Some college, no degree (4-8 years)
          </h6>
          <h6 className="font-weight-light">
            Associate's degree{" "}
            <i className="fa fa-minus" aria-hidden="true"></i> 6 years
          </h6>
          <h6 className="font-weight-light">
            Bachelor's degree <i className="fa fa-minus" aria-hidden="true"></i>{" "}
            (8 years)
          </h6>
          <h6 className="font-weight-light">Master's degree (9-10 years)</h6>
          <h6 className="font-weight-light">
            Doctoral or professional degree (13-15 years)
          </h6>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Education;
