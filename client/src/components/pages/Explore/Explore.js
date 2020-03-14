import React, { useEffect } from "react";
import data from "./Data.json";

const Explore = () => {
  useEffect(() => {
    // Update the document title using the browser API
    console.log(data);
  });

  const displayData = data.map(data => {
    return (
      <div key={data.CareerCluster}>
        <h1>{data.CareerCluster}</h1>
        {data.CareerPathway.map(pathway => {
          return <p>{pathway.Pathway}</p>;
        })}
      </div>
    );
  });

  return (
    <div>
      <h1 className="font-weight-light">Explore Careers</h1>
      {displayData}
    </div>
  );
};

export default Explore;
