import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Doughnut } from "react-chartjs-2";

const Skills = (props) => {
  const [showAll, setShowAll] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImportance, setSelectedImportance] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    var obj = props.data.OccupationDetail[0].SkillsDataList.sort(
      (a, b) => parseFloat(b.Importance) - parseFloat(a.Importance)
    ).slice(0, 15);
    var labels = Object.keys(obj).map(function (key) {
      return obj[key].ElementName + " Importance Value";
    });
    var values = Object.keys(obj).map(function (key) {
      return parseInt(obj[key].Importance);
    });
    var colors = Object.keys(obj).map(function (key) {
      return getColor(parseInt(obj[key].Importance));
    });

    setGraphData({
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
        },
      ],
    });
  }, [props.data.OccupationDetail]);

  const getImportance = (val) => {
    if (val <= 55) {
      return "low";
    } else if (val > 55 && val <= 65) {
      return "medium";
    } else if (val > 65) {
      return "high";
    }
  };

  const getColor = (val) => {
    if (val <= 55) {
      return "#1e3163";
    } else if (val > 55 && val <= 65) {
      return "#304f9c";
    } else if (val > 65) {
      return "#3c62c3";
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = (e) => {
    setShow(true);
    setSelectedOption(e.target.innerText.slice(0, -1));
    props.data.OccupationDetail[0].SkillsDataList.filter((obj) => {
      if (obj.ElementName === e.target.innerText.slice(0, -1)) {
        setSelectedDescription(obj.ElementDescription);
        setSelectedImportance(getImportance(obj.Importance));
        return null;
      }
      return null;
    });
  };

  const handleGraphShow = (elems) => {
    if (elems[0] !== undefined) {
      setShow(true);
      setSelectedOption(
        graphData.labels[elems[0]._index].replace(" Importance Value", "")
      );
      props.data.OccupationDetail[0].SkillsDataList.filter((obj) => {
        if (
          obj.ElementName ===
          graphData.labels[elems[0]._index].replace(" Importance Value", "")
        ) {
          setSelectedDescription(obj.ElementDescription);
          setSelectedImportance(getImportance(obj.Importance));
          return null;
        }
        return null;
      });
    }
  };

  const displaySkills = () =>
    props.data.OccupationDetail[0].SkillsDataList.map((skill) => {
      return (
        <Fragment key={skill.ElementName}>
          <Button
            style={{ margin: "0px 4px 4px 0px" }}
            onClick={handleShow}
            variant="light btn-xs"
            className="optionsButton"
            title={skill.ElementDescription}
          >
            {skill.ElementName}{" "}
            <i
              className="fa fa-circle-o"
              aria-hidden="true"
              style={{ color: getColor(skill.Importance) }}
            ></i>
          </Button>
        </Fragment>
      );
    });

  const displayImportantSkills = () =>
    props.data.OccupationDetail[0].SkillsDataList.sort(
      (a, b) => parseFloat(b.Importance) - parseFloat(a.Importance)
    )
      .slice(0, 5)
      .map((skill) => {
        return (
          <Fragment key={skill.ElementName}>
            <Button
              style={{ margin: "0px 4px 4px 0px" }}
              onClick={handleShow}
              variant="light btn-xs"
              className="optionsButton"
              title={skill.ElementDescription}
            >
              {skill.ElementName}{" "}
              <i
                className="fa fa-circle"
                aria-hidden="true"
                style={{ color: getColor(skill.Importance) }}
              ></i>
            </Button>
          </Fragment>
        );
      });

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedOption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>Importance: </b>
            {selectedImportance}
          </p>
          <p>
            <b>Description: </b>
            {selectedDescription}
          </p>
        </Modal.Body>
      </Modal>

      <Card style={{ border: "0px" }}>
        <Card.Body>
          <h3 className="font-weight-light">
            <i
              className="fa fa-child"
              aria-hidden="true"
              style={{ color: "#1e3163" }}
            ></i>
            &nbsp;Skills
          </h3>
          <p>
            Here are some skills employees in this industry are expected to
            have. Do you have any of these skills? Click or hover over a skill
            to view more information.
          </p>
          <hr />
          <p>
            <b>Top Skills</b>
          </p>
          {displayImportantSkills()}
          <br />
          <br />
          <div>
            <Doughnut
              onElementsClick={(elems) => {
                handleGraphShow(elems);
              }}
              data={graphData}
              options={{
                title: {
                  display: false,
                },
                legend: {
                  display: false,
                },
              }}
            />
          </div>
          <br />
          <hr />
          <Form>
            <Form.Check
              type="switch"
              id="skills-switch"
              checked={showAll}
              onChange={() => setShowAll(!showAll)}
              label={
                <p>
                  <b>
                    View All{" "}
                    {props.data.OccupationDetail[0].SkillsDataList.length}{" "}
                    Skills
                  </b>
                </p>
              }
            />
          </Form>
          {showAll ? displaySkills() : null}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Skills;
