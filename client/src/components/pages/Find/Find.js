import React from "react";
import Card from "react-bootstrap/Card";

class Find extends React.Component {
  render() {
    return (
      <div className="find">
        <h1 className="font-weight-light">Find the perfect career for you!</h1>
        <br />
        <Card className="find-quiz">
          <h4 className="font-weight-light">1. My favorite subjects are:</h4>
        </Card>
      </div>
    );
  }
}

export default Find;
