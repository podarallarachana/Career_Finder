import React, { Fragment } from "react";
import Navbar from "./components/shared/Nav";
import Home from "./components/Home";
import "./App.css";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Home />
    </Fragment>
  );
};

export default App;
