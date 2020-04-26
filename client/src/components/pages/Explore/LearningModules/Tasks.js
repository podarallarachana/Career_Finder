import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Tasks = (props) => {
  const [showAll, setShowAll] = useState(false);

  const displayTasks = () =>
    props.data.OccupationDetail[0].Tasks.map((task) => {
      return (
        <Fragment key={task.TaskId}>
          <h6 className="font-weight-light">
            <i
              style={{ color: "#c8f08f" }}
              className="fa fa-arrow-right"
              aria-hidden="true"
            ></i>{" "}
            {task.TaskDescription}
          </h6>
        </Fragment>
      );
    });

  const displayImportantTasks = () =>
    props.data.OccupationDetail[0].Tasks.slice(0, 6).map((task) => {
      return (
        <Fragment key={task.TaskId}>
          <h6 className="font-weight-light">
            <i
              style={{ color: "#c8f08f" }}
              className="fa fa-arrow-right"
              aria-hidden="true"
            ></i>{" "}
            {task.TaskDescription}
          </h6>
        </Fragment>
      );
    });

  return (
    <Fragment>
      <Card style={{ border: "0px" }}>
        <Card.Body>
          <h3 className="font-weight-light">
            <i
              style={{ color: "#5aa700" }}
              className="fa fa-tasks"
              aria-hidden="true"
            ></i>{" "}
            Tasks
          </h3>
          <p>
            Here are some tasks you would be expected to do on the job. Would
            you like doing these tasks?
          </p>
          <hr />
          <p>
            <b>Tasks</b>
          </p>
          {displayImportantTasks()}
          <br />
          <hr />
          <Form>
            <Form.Check
              type="switch"
              id="tasks-switch"
              checked={showAll}
              onChange={() => setShowAll(!showAll)}
              label={
                <p>
                  <b>
                    View All {props.data.OccupationDetail[0].Tasks.length} Tasks
                  </b>
                </p>
              }
            />
          </Form>
          {showAll ? displayTasks() : null}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Tasks;
