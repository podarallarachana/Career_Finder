import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Nav } from "react-bootstrap";
import { Pie } from "react-chartjs-2";

const Wages = props => {
  const [annualGraphData, setAnnualGraphData] = useState({});
  const [hourlyGraphData, setHourlyGraphData] = useState({});
  const [graphData, setGraphData] = useState({});
  const [activeTab, setActiveTab] = useState("annual");
  const [medianAnnual, setMedianAnnual] = useState("");
  const [medianHourly, setMedianHourly] = useState("");

  const handleSelect = newTab => {
    if (newTab !== activeTab) {
      if (newTab === "annual") {
        setGraphData(annualGraphData);
      } else if (newTab === "hourly") {
        setGraphData(hourlyGraphData);
      }
      setActiveTab(newTab);
    }
  };

  useEffect(() => {
    var labels = [
      "Bottom 10% of Employees",
      "Bottom 25% of Employees",
      "Average Employees",
      "Top 25% of Employees",
      "Top 10% of Employees"
    ];

    var annual = [];
    var hourly = [];

    if (
      props.data.OccupationDetail[0].Wages.NationalWagesList[0].RateType ===
      "Annual"
    ) {
      annual = [
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct10,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct25,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Median,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct75,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct90
      ];

      hourly = [
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct10,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct25,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Median,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct75,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct90
      ];
      setMedianAnnual(
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Median
      );
      setMedianHourly(
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Median
      );
    } else {
      annual = [
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct10,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct25,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Median,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct75,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct90
      ];

      hourly = [
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct10,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct25,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Median,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct75,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct90
      ];
      setMedianAnnual(
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Median
      );
      setMedianHourly(
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Median
      );
    }

    setAnnualGraphData({
      labels: labels,
      datasets: [
        {
          data: annual,
          backgroundColor: [
            "#c0e6ff",
            "#7cc7ff",
            "#5aaafa",
            "#5596e6",
            "#4178be"
          ]
        }
      ]
    });

    setHourlyGraphData({
      labels: labels,
      datasets: [
        {
          data: hourly,
          backgroundColor: [
            "#c0e6ff",
            "#7cc7ff",
            "#5aaafa",
            "#5596e6",
            "#4178be"
          ]
        }
      ]
    });

    setGraphData({
      labels: labels,
      datasets: [
        {
          data: annual,
          backgroundColor: [
            "#c0e6ff",
            "#7cc7ff",
            "#5aaafa",
            "#5596e6",
            "#4178be"
          ]
        }
      ]
    });
  }, [props.data.OccupationDetail]);

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 sections">
      <Card style={{ border: "0px" }}>
        <Card.Body>
          <h3 className="font-weight-light">Salary</h3>
          <h6 className="font-weight-light">
            ${medianAnnual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} per
            year
          </h6>
          <h6 className="font-weight-light">
            ${medianHourly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} per
            hour
          </h6>
          <hr />
          <p>
            <b>All Salaries{<br />}</b>
            Is money important to you? See how much money you are most likely to
            make in this career.
          </p>
          <Nav
            fill
            variant="pills"
            defaultActiveKey={activeTab}
            onSelect={handleSelect}
          >
            <Nav.Item>
              <Nav.Link eventKey="annual">Annual Salaries</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="hourly">Hourly Salaries</Nav.Link>
            </Nav.Item>
          </Nav>
          <div>
            <br />
            <Pie
              options={{
                title: {
                  display: false
                },
                legend: {
                  display: false
                },
                responsive: true
              }}
              data={graphData}
              redraw
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Wages;
