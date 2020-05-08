import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Activities = (props) => {
  const [dwaData, setDwaTitle] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    var tmp = [];
    for (var i = 0; i < props.data.OccupationDetail[0].Dwas.length; i++) {
      var doesExist = false;
      for (var j = 0; j < tmp.length; j++) {
        if (tmp[j].Title === props.data.OccupationDetail[0].Dwas[i].DwaTitle) {
          doesExist = true;
        }
      }
      if (!doesExist) {
        tmp.push({
          Title: props.data.OccupationDetail[0].Dwas[i].DwaTitle,
        });
      }
    }
    setDwaTitle(tmp);
  }, [props.data.OccupationDetail]);

  const displayActivities = () =>
    dwaData.map((activity) => {
      return (
        <Fragment key={activity.Title}>
          <i
            className="fa fa-check-square-o"
            style={{ color: "#1e3163" }}
            aria-hidden="true"
          ></i>{" "}
          {activity.Title}
          <br />
        </Fragment>
      );
    });

  const displayImportantActivities = () =>
    dwaData.slice(0, 5).map((activity) => {
      return (
        <Fragment key={activity.Title}>
          <i
            className="fa fa-check-square-o"
            style={{ color: "#1e3163" }}
            aria-hidden="true"
          ></i>{" "}
          {activity.Title}
          <br />
        </Fragment>
      );
    });

  return (
    <Card style={{ border: "0px" }}>
      <Card.Body>
        <h3 className="font-weight-light">
          <i
            className="fa fa-sun-o"
            aria-hidden="true"
            style={{ color: "#1e3163" }}
          ></i>{" "}
          Daily Activities
        </h3>
        <p>
          Here are some of the daily activites you will be expected to do. Would
          you enjoy doing these activities?
        </p>
        <hr />
        <p>
          <b>Activities</b>
        </p>
        <h6 className="font-weight-light">{displayImportantActivities()}</h6>
        <br />
        <hr />
        <Form>
          <Form.Check
            type="switch"
            id="activities-switch"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
            label={
              <p>
                <b>
                  View All {props.data.OccupationDetail[0].Dwas.length}{" "}
                  Activities
                </b>
              </p>
            }
          />
        </Form>
        <h6 className="font-weight-light">
          {showAll ? displayActivities() : null}
        </h6>
      </Card.Body>
    </Card>
  );
};

export default Activities;
