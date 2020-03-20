import React from "react";
import { ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import data from "./Data.json";

const SideNav = props => {
  const updateActiveCluster = e => {
    props.updateActiveCluster(e.target.innerText);
    props.updateActivePathway(e.target.innerText);
  };

  const displayClusters = data.map(data => {
    return (
      <LinkContainer
        key={data.CareerClusterKey}
        to={"/explore/" + data.CareerClusterKey + "/ds/2"}
      >
        <ListGroup.Item onClick={updateActiveCluster}>
          {data.CareerCluster}
        </ListGroup.Item>
      </LinkContainer>
    );
  });

  return (
    <div className="sidenav">
      <ListGroup>{displayClusters}</ListGroup>
    </div>
  );
};

export default SideNav;
