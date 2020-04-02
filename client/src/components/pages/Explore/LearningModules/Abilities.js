import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Abilities = props => {
  const [showAll, setShowAll] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const displayImportantAbilities = () =>
    props.data.OccupationDetail[0].AbilityDataList.sort(
      (a, b) => parseFloat(b.Importance) - parseFloat(a.Importance)
    )
      .slice(0, 10)
      .map(ability => {
        return (
          <Fragment key={ability.ElementName}>
            <Button
              onClick={handleShow}
              variant="outline-secondary btn-sm"
              className="optionsButton"
              title={ability.ElementDescription}
            >
              {ability.ElementName}
            </Button>{" "}
          </Fragment>
        );
      });

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
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
            {displayImportantAbilities()}
            <br />
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
