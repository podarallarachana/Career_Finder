import React, { Fragment, useEffect } from "react";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Occupation from "./components/pages/Explore/Occupation";
import About from "./components/pages/About";
import setAuthToken from "./state-management/utilities/setAuthToken";
import { Provider } from "react-redux";
import { loadUser } from "./state-management/actions/authorization";
import store from "./state-management/store";
import NavigationBar from "./components/shared/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Find from "./components/pages/Find/Find";
import Prepare from "./components/pages/Prepare/Prepare";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
require("dotenv").config();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavigationBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <section className="container">
            <Switch>
              <Route exact path="/explore/:code" component={Occupation} />
              <Route exact path="/about" component={About} />
              <Route exact path="/find" component={Find} />
              <Route exact path="/prepare" component={Prepare} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
