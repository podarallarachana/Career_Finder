import React, { Fragment } from "react";
import findData from "./FindData.json";
import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";

class Find extends React.Component {
  componentDidMount() {
    //console.log(findData[0].Subjects);
  }

  displaySubjects = type => {
    return (
      <div className="col-12">
        {findData[0][type].map(data => {
          return (
            <Fragment key={data.ElementName}>
              <Button
                variant="light btn-sm"
                className="optionsButton"
                title={data.Question}
              >
                {data.ElementName}
              </Button>{" "}
            </Fragment>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div className="find">
        <h1 className="font-weight-light">Find the perfect career for you!</h1>
        <i>
          You do not need to fill out every section. Only pick the skills that
          apply to you, you can pick as many as you like.
        </i>
        <br />
        <br />
        <Card className="row find-quiz">
          <Form>
            <h4 className="font-weight-light">My favorite subjects are:</h4>
            <br />
            {this.displaySubjects("Subjects")}
            <br />
            <h4 className="font-weight-light">I am good at:</h4>
            <br />
            {this.displaySubjects("PersonalityTraits")}
            <br />
            <h4 className="font-weight-light">I like working with people:</h4>
            <br />
            {this.displaySubjects("PersonalityTraits")}
            <br />
            <h4 className="font-weight-light">I like working with my hands:</h4>
            <br />
            {this.displaySubjects("PersonalityTraits")}
            <br />
            <h4 className="font-weight-light">I like technology:</h4>
            <br />
            {this.displaySubjects("Technology")}
            <br />
            <h4 className="font-weight-light">I'm good at managing things:</h4>
            <br />
            {this.displaySubjects("Management")}
            <br />
          </Form>
        </Card>
      </div>
    );
  }
}

export default Find;
