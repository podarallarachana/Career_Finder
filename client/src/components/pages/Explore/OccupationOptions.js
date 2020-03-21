import React, { Fragment } from "react";
import data from "./Data.json";
import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const OccupationOptions = props => {
  const displayPathways = () =>
    data.map(data => {
      if (props.activeCluster === data.CareerCluster) {
        return (
          <div className="col-12" key={data.CareerCluster}>
            {data.CareerPathway.map(pathway => {
              return (
                <Fragment key={pathway.Pathway}>
                  <Button
                    onClick={() => {
                      props.updateActivePathway(pathway.Pathway);
                    }}
                    variant={
                      pathway.Pathway === props.activePathway
                        ? "primary btn-sm"
                        : "light btn-sm"
                    }
                    className="jumbatronButton"
                  >
                    {pathway.Pathway}
                  </Button>{" "}
                </Fragment>
              );
            })}
            <hr />
          </div>
        );
      } else {
        return null;
      }
    });

  const displayOccupations = () => {
    if (props.activeCluster) {
      return (
        <div className="col-12" key={data.CareerCluster}>
          {data
            .find(x => x.CareerCluster === props.activeCluster)
            .CareerPathway.find(x => x.Pathway === props.activePathway)
            .Jobs.map(job => {
              return (
                <Fragment key={job.Code}>
                  <LinkContainer
                    key={data.CareerCluster}
                    to={"/explore/" + job.Code}
                  >
                    <Button
                      onClick={() => {
                        props.updateActiveOccupation(job.Code);
                      }}
                      variant={
                        job.Code === props.activeOccupation
                          ? "primary btn-sm"
                          : "outline-primary btn-sm"
                      }
                      className="jumbatronButton"
                    >
                      {job.Occupation}
                    </Button>
                  </LinkContainer>{" "}
                </Fragment>
              );
            })}{" "}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Jumbotron style={{ marginBottom: "0px" }}>
      <h1 className="font-weight-light">{props.activeCluster}</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <div className="row justify-content-center">
        {displayPathways()}
        {displayOccupations()}
      </div>
    </Jumbotron>
  );
};

export default OccupationOptions;
