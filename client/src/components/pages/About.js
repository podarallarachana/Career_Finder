import React from "react";

const About = () => {
  return (
    <div className="about">
      <br /> <br /> <br /> <br />
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6">
          <h1>
            <i className="fa fa-info-circle" aria-hidden="true"></i> About
          </h1>
          <h4 className="font-weight-light">
            Career Finder recommends careers to students based on personality
            tests and keyword matches and gives students a comprehensive
            overview of 1000+ careers. It also helps students find college
            programs, certifications, and licenses to help kickstart their
            careers
          </h4>
          <br />
          <h5>Data Sources</h5>
          <h6 className="font-weight-light">
            https://www.careeronestop.org/Developers/WebAPI/web-api.aspx
          </h6>
          <h6 className="font-weight-light">
            https://collegescorecard.ed.gov/data/documentation/
          </h6>
          <h6 className="font-weight-light">
            https://careerwise.minnstate.edu/careers/clusters.html
          </h6>
          <br />
          <h5>Graphics</h5>
          <h6 className="font-weight-light">https://www.freepik.com/</h6>
        </div>
      </div>
    </div>
  );
};

export default About;
