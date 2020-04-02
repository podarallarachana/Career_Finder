import React from "react";
import { ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import data from "./Data.json";

const SideNav = props => {
  const updateActives = e => {
    if (e.target.innerText === "Search") {
      props.updateActives(e.target.innerText, undefined, undefined);
    } else {
      props.updateActives(
        e.target.innerText,
        getCode(e.target.innerText).pathway,
        getCode(e.target.innerText).code
      );
    }
  };

  const getCode = CareerCluster => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].CareerCluster === CareerCluster) {
        //RETURNS FIRST OCCOUPATION CODE IN SELECTED CLUSTER
        return {
          code: data[i].CareerPathway[0].Jobs[0].Code,
          pathway: data[i].CareerPathway[0].Pathway
        };
      }
    }
  };

  const displayClusters = data.map(data => {
    return (
      <LinkContainer
        key={data.CareerCluster}
        to={"/explore/" + getCode(data.CareerCluster).code}
        style={{
          backgroundColor:
            data.CareerCluster !== props.activeCluster ? "white" : "#007bff",
          color: data.CareerCluster !== props.activeCluster ? "black" : "white"
        }}
      >
        <ListGroup.Item onClick={updateActives}>
          {data.CareerCluster}
        </ListGroup.Item>
      </LinkContainer>
    );
  });

  return (
    <div className="sidenav">
      <LinkContainer
        to={"/explore/search"}
        style={{
          backgroundColor:
            props.activeCluster !== "Search" ? "white" : "#007bff",
          color: props.activeCluster !== "Search" ? "black" : "white"
        }}
      >
        <ListGroup.Item onClick={updateActives}>Search</ListGroup.Item>
      </LinkContainer>
      <ListGroup>{displayClusters}</ListGroup>
    </div>
  );
};

export default SideNav;
