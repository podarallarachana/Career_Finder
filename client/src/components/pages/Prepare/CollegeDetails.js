import React from "react";
import Button from "react-bootstrap/Button";

const CollegeDetails = (props) => {
  return (
    <div className="colleges">
      <Button variant="primary" onClick={props.setShowCollegeDetails}>
        Primary
      </Button>
      <h1>DETAILS</h1>
    </div>
  );
};

export default CollegeDetails;
