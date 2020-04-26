import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Doughnut } from "react-chartjs-2";

const Knowledge = (props) => {
  const [showAll, setShowAll] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImportance, setSelectedImportance] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    var obj = props.data.OccupationDetail[0].KnowledgeDataList.sort(
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
      return "#2d660a";
    } else if (val > 55 && val <= 65) {
      return "#5aa700";
    } else if (val > 65) {
      return "#8cd211";
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = (e) => {
    setShow(true);
    setSelectedOption(e.target.innerText.slice(0, -1));
    props.data.OccupationDetail[0].KnowledgeDataList.filter((obj) => {
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
      props.data.OccupationDetail[0].KnowledgeDataList.filter((obj) => {
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

  const displayKnowledge = () =>
    props.data.OccupationDetail[0].KnowledgeDataList.map((knowledge) => {
      return (
        <Fragment key={knowledge.ElementName}>
          <Button
            onClick={handleShow}
            variant="light btn-sm"
            className="optionsButton"
            title={knowledge.ElementDescription}
          >
            {knowledge.ElementName}{" "}
            <i
              className="fa fa-circle-o"
              aria-hidden="true"
              style={{ color: getColor(knowledge.Importance) }}
            ></i>
          </Button>{" "}
        </Fragment>
      );
    });

  const displayImportantKnowledge = () =>
    props.data.OccupationDetail[0].KnowledgeDataList.sort(
      (a, b) => parseFloat(b.Importance) - parseFloat(a.Importance)
    )
      .slice(0, 15)
      .map((knowledge) => {
        return (
          <Fragment key={knowledge.ElementName}>
            <Button
              onClick={handleShow}
              variant="light btn-sm"
              className="optionsButton"
              title={knowledge.ElementDescription}
            >
              {knowledge.ElementName}{" "}
              <i
                className="fa fa-circle"
                aria-hidden="true"
                style={{ color: getColor(knowledge.Importance) }}
              ></i>
            </Button>{" "}
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
          <h3 className="font-weight-light">Subjects</h3>
          <p>
            Here are some subjects that people in this industry should excel in.
            Have you ever taken any of these subjects at school? Are you good at
            them? Click or hover over a subject to view more information.
          </p>
          <hr />
          <p>
            <b>Top Subjects</b>
          </p>
          {displayImportantKnowledge()}
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
              id="Knowledge-switch"
              checked={showAll}
              onChange={() => setShowAll(!showAll)}
              label={
                <p>
                  <b>
                    View All{" "}
                    {props.data.OccupationDetail[0].KnowledgeDataList.length}{" "}
                    Subjects
                  </b>
                </p>
              }
            />
          </Form>
          {showAll ? displayKnowledge() : null}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Knowledge;
