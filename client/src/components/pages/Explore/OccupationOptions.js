import React from "react";
import data from "./Data.json";
import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const OccupationOptions = (props) => {
  const displayPathways = () =>
    data.map((data) => {
      if (props.activeCluster === data.CareerCluster) {
        return (
          <div key={data.CareerCluster}>
            {data.CareerPathway.map((pathway) => {
              return (
                <Button
                  style={{ margin: "0px 4px 4px 0px" }}
                  key={pathway.Pathway}
                  onClick={() => {
                    props.updateActivePathway(pathway.Pathway);
                  }}
                  variant={
                    pathway.Pathway === props.activePathway
                      ? "light btn-xs"
                      : "outline-light btn-xs"
                  }
                  className="optionsButton"
                >
                  {pathway.Pathway}
                </Button>
              );
            })}
            {/* <hr /> */}
            <br />
            <br />
          </div>
        );
      } else {
        return null;
      }
    });

  const displayOccupations = () => {
    if (props.activeCluster) {
      return (
        <div key={data.CareerCluster}>
          {data
            .find((x) => x.CareerCluster === props.activeCluster)
            .CareerPathway.find((x) => x.Pathway === props.activePathway)
            .Jobs.map((job) => {
              return (
                <LinkContainer
                  key={job.Code}
                  to={"/explore/" + job.Code}
                  style={{ margin: "0px 4px 4px 0px" }}
                >
                  <Button
                    onClick={() => {
                      props.updateActiveOccupation(job.Code);
                    }}
                    variant={
                      job.Code === props.activeOccupation
                        ? "light btn-xs"
                        : "outline-light btn-xs"
                    }
                    className="optionsButton"
                  >
                    {job.Occupation}
                  </Button>
                </LinkContainer>
              );
            })}
        </div>
      );
    } else {
      return null;
    }
  };

  const displayClusterInfo = (cluster) => {
    for (var x = 0; x < data.length; x++) {
      if (data[x].CareerCluster === cluster) {
        return data[x].Description;
      }
    }
  };

  return (
    <Jumbotron
      className="explore-header"
      style={{
        marginBottom: "0px",
        padding: "15px",
      }}
    >
      <h1 style={{ color: "white" }}>{props.activeCluster}</h1>
      <small style={{ color: "white" }}>
        {displayClusterInfo(props.activeCluster)}
      </small>
      <br />
      <br />
      <div>
        {displayPathways()}
        {displayOccupations()}
      </div>
    </Jumbotron>
  );
};

export default OccupationOptions;
