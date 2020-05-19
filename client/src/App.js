import React, { Fragment, useEffect } from "react";
import Home from "./components/pages/Home";
import Occupation from "./components/pages/Explore/Occupation";
import About from "./components/pages/About";
import setAuthToken from "./state-management/utilities/setAuthToken";
import { Provider } from "react-redux";
import store from "./state-management/store";
import NavigationBar from "./components/shared/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Find from "./components/pages/Find/Find";
import Prepare from "./components/pages/Prepare/Prepare";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

require("dotenv").config();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavigationBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/find" component={Find} />
          <Route exact path="/prepare" component={Prepare} />
          <Route exact path="/explore/:code" component={Occupation} />
          <Route exact path="/about" component={About} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
