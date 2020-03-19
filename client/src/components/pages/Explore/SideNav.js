import React from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import data from "./Data.json";

const SideNav = props => {
  const updateActiveCluster = e => {
    props.updateActiveCluster(e.target.innerText);
  };

  const displayClusters = data.map(data => {
    return (
      <ListGroup.Item
        onClick={updateActiveCluster}
        key={data.CareerCluster}
        style={{
          backgroundColor:
            data.CareerCluster !== props.activeCluster ? "white" : "red",
          color: data.CareerCluster !== props.activeCluster ? "black" : "white"
        }}
      >
        {data.CareerCluster}
      </ListGroup.Item>
    );
  });

  return (
    <div className="sidenav">
      <Form>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <div className="input-group-append">
            <Button variant="outline-success">
              <i className="fa fa-search"></i>
            </Button>
          </div>
        </div>
      </Form>
      <br />
      <ListGroup>{displayClusters}</ListGroup>
    </div>
  );
};

export default SideNav;