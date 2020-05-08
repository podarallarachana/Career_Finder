import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Doughnut } from "react-chartjs-2";

const Education = (props) => {
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
        "Doctoral or professional degree",
      ],
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#d8e0f3",
            "#b1c0e7",
            "#8aa1db",
            "#6382cf",
            "#3c62c3",
            "#304f9c",
            "#1e3163",
          ],
        },
      ],
    });
  }, [props.data.OccupationDetail]);

  return (
    <Card style={{ border: "0px" }}>
      <Card.Body>
        <h3 className="font-weight-light">
          {" "}
          <i
            className="fa fa-graduation-cap"
            style={{ color: "#1e3163" }}
            aria-hidden="true"
          ></i>{" "}
          Education
        </h3>
        <p>
          See what education level different employees in the industry have. How
          many years are you willing to stay in school? Most people in this
          career have:{" "}
          <span
            style={{
              color: "#8aa1db",
            }}
          >
            {props.data.OccupationDetail[0].EducationTraining.EducationTitle}
          </span>
          .
        </p>
        <hr />
        <p>
          <b>All Levels{<br />}</b>
        </p>
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
        <hr />
        <h6>How long does it take to complete?</h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#d8e0f3" }}
            aria-hidden="true"
          ></i>{" "}
          Less than high school diploma{" "}
          <i
            className="fa fa-minus"
            style={{ color: "#e8e8e8" }}
            aria-hidden="true"
          ></i>{" "}
          0-4 years
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#b1c0e7" }}
            aria-hidden="true"
          ></i>{" "}
          High school diploma or equivalent{" "}
          <i
            className="fa fa-minus"
            style={{ color: "#e8e8e8" }}
            aria-hidden="true"
          ></i>{" "}
          4 years
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#8aa1db" }}
            aria-hidden="true"
          ></i>{" "}
          Some college, no degree{" "}
          <i
            className="fa fa-minus"
            style={{ color: "#e8e8e8" }}
            aria-hidden="true"
          ></i>{" "}
          4-8 years
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#6382cf" }}
            aria-hidden="true"
          ></i>{" "}
          Associate's degree{" "}
          <i
            className="fa fa-minus"
            style={{ color: "#e8e8e8" }}
            aria-hidden="true"
          >
            {" "}
          </i>{" "}
          6 years
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#3c62c3" }}
            aria-hidden="true"
          ></i>{" "}
          Bachelor's degree{" "}
          <i
            className="fa fa-minus"
            style={{ color: "#e8e8e8" }}
            aria-hidden="true"
          ></i>{" "}
          8 years
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#304f9c" }}
            aria-hidden="true"
          ></i>{" "}
          Master's degree{" "}
          <i
            className="fa fa-minus"
            style={{ color: "#e8e8e8" }}
            aria-hidden="true"
          ></i>{" "}
          9-10 years
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#1e3163" }}
            aria-hidden="true"
          ></i>{" "}
          Doctoral or professional degree{" "}
          <i
            className="fa fa-minus"
            style={{ color: "#e8e8e8" }}
            aria-hidden="true"
          ></i>{" "}
          13-15 years
        </h6>
      </Card.Body>
    </Card>
  );
};

export default Education;
