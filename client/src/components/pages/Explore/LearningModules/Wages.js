import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Nav } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const Wages = (props) => {
  const [annualGraphData, setAnnualGraphData] = useState({});
  const [hourlyGraphData, setHourlyGraphData] = useState({});
  const [graphData, setGraphData] = useState({});
  const [activeTab, setActiveTab] = useState("annual");
  const [annual, setAnnual] = useState(0);
  const [hourly, setHourly] = useState(0);

  const handleSelect = (newTab) => {
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
      "The Average Employee",
      "Top 25% of Employees",
      "Top 10% of Employees",
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
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct90,
      ];

      hourly = [
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct10,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct25,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Median,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct75,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct90,
      ];
      setAnnual(0);
      setHourly(1);
    } else {
      annual = [
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct10,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct25,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Median,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct75,
        props.data.OccupationDetail[0].Wages.NationalWagesList[1].Pct90,
      ];

      hourly = [
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct10,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct25,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Median,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct75,
        props.data.OccupationDetail[0].Wages.NationalWagesList[0].Pct90,
      ];
      setAnnual(1);
      setHourly(0);
    }

    setAnnualGraphData({
      labels: labels,
      datasets: [
        {
          data: annual,
          backgroundColor: [
            "#8aa1db",
            "#6382cf",
            "#3c62c3",
            "#304f9c",
            "#1e3163",
          ],
        },
      ],
    });

    setHourlyGraphData({
      labels: labels,
      datasets: [
        {
          data: hourly,
          backgroundColor: [
            "#8aa1db",
            "#6382cf",
            "#3c62c3",
            "#304f9c",
            "#1e3163",
          ],
        },
      ],
    });

    setGraphData({
      labels: labels,
      datasets: [
        {
          data: annual,
          backgroundColor: [
            "#8aa1db",
            "#6382cf",
            "#3c62c3",
            "#304f9c",
            "#1e3163",
          ],
        },
      ],
    });
  }, [props.data.OccupationDetail]);

  return (
    <Card style={{ border: "0px" }}>
      <Card.Body>
        <h3 className="font-weight-light">
          <i
            className="fa fa-dollar"
            style={{ color: "#1e3163" }}
            aria-hidden="true"
          ></i>{" "}
          Salary
        </h3>
        <p>
          Is money important to you? See how much money you are most likely to
          make in this career. Most employees in this career make{" "}
          <span style={{ color: "#8aa1db" }}>
            $
            {props.data.OccupationDetail[0].Wages.NationalWagesList[
              annual
            ].Median.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>{" "}
          per year and{" "}
          <span style={{ color: "#8aa1db" }}>
            $
            {props.data.OccupationDetail[0].Wages.NationalWagesList[
              hourly
            ].Median.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>{" "}
          per hour.
        </p>
        <hr />
        <p>
          <b>All Salaries{<br />}</b>
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
          <Bar
            options={{
              scales: {
                xAxes: [
                  {
                    ticks: {
                      display: false,
                    },
                  },
                ],
              },
              title: {
                display: false,
              },
              legend: {
                display: false,
              },
              responsive: true,
            }}
            data={graphData}
            redraw
          />
        </div>
        <hr />
        <h6>How much do people in this career make?</h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#8aa1db" }}
            aria-hidden="true"
          ></i>{" "}
          The bottom 10% of employees make{" "}
          <i
            className="fa fa-dollar"
            style={{ color: "#e0e0e0" }}
            aria-hidden="true"
          ></i>{" "}
          {props.data.OccupationDetail[0].Wages.NationalWagesList[
            activeTab === "annual" ? annual : hourly
          ].Pct10.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#6382cf" }}
            aria-hidden="true"
          ></i>{" "}
          The bottom 25% of employees make{" "}
          <i
            className="fa fa-dollar"
            style={{ color: "#e0e0e0" }}
            aria-hidden="true"
          ></i>{" "}
          {props.data.OccupationDetail[0].Wages.NationalWagesList[
            activeTab === "annual" ? annual : hourly
          ].Pct25.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#3c62c3" }}
            aria-hidden="true"
          ></i>{" "}
          The average employee makes{" "}
          <i
            className="fa fa-dollar"
            style={{ color: "#e0e0e0" }}
            aria-hidden="true"
          ></i>{" "}
          {props.data.OccupationDetail[0].Wages.NationalWagesList[
            activeTab === "annual" ? annual : hourly
          ].Median.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#304f9c" }}
            aria-hidden="true"
          ></i>{" "}
          The top 25% of employees make{" "}
          <i
            className="fa fa-dollar"
            style={{ color: "#e0e0e0" }}
            aria-hidden="true"
          >
            {" "}
          </i>{" "}
          {props.data.OccupationDetail[0].Wages.NationalWagesList[
            activeTab === "annual" ? annual : hourly
          ].Pct75.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h6>
        <h6 className="font-weight-light">
          <i
            className="fa fa-circle"
            style={{ color: "#1e3163" }}
            aria-hidden="true"
          ></i>{" "}
          The top 10% of employees take{" "}
          <i
            className="fa fa-dollar"
            style={{ color: "#e0e0e0" }}
            aria-hidden="true"
          ></i>{" "}
          {props.data.OccupationDetail[0].Wages.NationalWagesList[
            activeTab === "annual" ? annual : hourly
          ].Pct90.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h6>
      </Card.Body>
    </Card>
  );
};

export default Wages;
