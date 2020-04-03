import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Chart } from "react-charts";

const Abilities = props => {
  useEffect(() => {
    var obj = props.data.OccupationDetail[0].AbilityDataList.sort(
      (a, b) => parseFloat(b.Importance) - parseFloat(a.Importance)
    ).slice(0, 6);
    var result = Object.keys(obj).map(function(key) {
      return [obj[key].ElementName, obj[key].Importance];
    });
    setGraphData(result);
  }, [props.data.OccupationDetail]);

  const [showAll, setShowAll] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImportance, setSelectedImportance] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [graphData, setGraphData] = useState([]);

  const data = React.useMemo(
    () => [
      {
        label: "Top Abilities",
        data: graphData,
        color: "red"
      }
    ],
    [graphData]
  );

  const series = React.useMemo(
    () => ({
      type: "bar"
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "left" },
      { position: "bottom", type: "linear", stacked: true }
    ],
    []
  );

  const handleClose = () => setShow(false);

  const handleShow = e => {
    setShow(true);
    setSelectedOption(e.target.innerText);
    props.data.OccupationDetail[0].AbilityDataList.filter(obj => {
      if (obj.ElementName === e.target.innerText) {
        setSelectedDescription(obj.ElementDescription);
        if (obj.Importance <= 10) {
          setSelectedImportance("low");
        } else if (obj.Importance > 10 && obj.Importance <= 40) {
          setSelectedImportance("medium");
        } else if (obj.Importance > 40) {
          setSelectedImportance("high");
        }
      }
    });
  };

  const displayAbilities = () =>
    props.data.OccupationDetail[0].AbilityDataList.map(ability => {
      return (
        <Fragment key={ability.ElementName}>
          <Button
            onClick={handleShow}
            variant="light btn-sm"
            className="optionsButton"
            title={ability.ElementDescription}
          >
            {ability.ElementName}
          </Button>{" "}
        </Fragment>
      );
    });

  const getImportantAbilities = () => {
    var obj = props.data.OccupationDetail[0].AbilityDataList.sort(
      (a, b) => parseFloat(b.Importance) - parseFloat(a.Importance)
    ).slice(0, 10);
    var result = Object.keys(obj).map(function(key) {
      return [obj[key].ElementName, obj[key].Importance];
    });
    console.log(result);
    setGraphData([[0, 1]]);
  };

  // const displayImportantAbilities = () =>
  //   props.data.OccupationDetail[0].AbilityDataList.sort(
  //     (a, b) => parseFloat(b.Importance) - parseFloat(a.Importance)
  //   )
  //     .slice(0, 6)
  //     .map(ability => {
  //       return (
  //         <Fragment key={ability.ElementName}>
  //           <Button
  //             onClick={handleShow}
  //             variant="outline-secondary btn-sm"
  //             className="optionsButton"
  //             title={ability.ElementDescription}
  //           >
  //             {ability.ElementName}
  //           </Button>{" "}
  //         </Fragment>
  //       );
  //     });

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

      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 sections">
        <Card>
          <Card.Header
            as="h5"
            style={{ backgroundColor: "#fa6f0f", color: "white" }}
          >
            <i className="fa fa-asterisk" aria-hidden="true"></i> Abilities
          </Card.Header>
          <Card.Body>
            <p>
              These are abilities that employees in the industry should have. Do
              you have any of these abilites? Click on an ability to view more
              information.
            </p>
            <p>
              <b>Top Abilities</b>
            </p>
            <div
              style={{
                height: "300px"
              }}
            >
              <Chart data={data} series={series} axes={axes} tooltip />
            </div>
            <br />
            <Form>
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={showAll}
                onChange={() => setShowAll(!showAll)}
                label={
                  <p>
                    <b>
                      View All{" "}
                      {props.data.OccupationDetail[0].AbilityDataList.length}{" "}
                      Abilities
                    </b>
                  </p>
                }
              />
            </Form>
            {showAll ? displayAbilities() : null}
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};

export default Abilities;
