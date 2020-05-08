import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";

const Interests = (props) => {
  const dispayInterests = () =>
    props.data.OccupationDetail[0].InterestDataList.map((interest) => {
      return (
        <Fragment key={interest.ElementName}>
          <Card
            title={interest.ElementDescription}
            style={{
              backgroundColor: "#f8f9fa",
              border: "0px",
              marginBottom: "5px",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <h6>
                <i
                  className="fa fa-star"
                  style={{ color: "#1e3163" }}
                  aria-hidden="true"
                ></i>{" "}
                {interest.ElementName}
              </h6>
              <h6 className="font-weight-light">
                {interest.ElementDescription}
              </h6>
            </Card.Body>
          </Card>
        </Fragment>
      );
    });

  return (
    <Fragment>
      <Card style={{ border: "0px" }}>
        <Card.Body>
          <h3 className="font-weight-light">
            <i
              className="fa fa-star-o"
              style={{ color: "#1e3163" }}
              aria-hidden="true"
            ></i>{" "}
            <b>Industry </b>
            Interests
          </h3>
          <p>
            Here are some interests and associated responsibilites this career
            has.
          </p>
          <hr />
          {dispayInterests()}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Interests;
