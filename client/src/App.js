import React, { Fragment, useEffect } from "react";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Explore from "./components/pages/Explore/Explore";
import Pathway from "./components/pages/Explore/Pathway";
import About from "./components/pages/About";
import setAuthToken from "./state-management/utilities/setAuthToken";
import { Provider } from "react-redux";
import { loadUser } from "./state-management/actions/authorization";
import store from "./state-management/store";
import NavigationBar from "./components/shared/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

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
              <Route exact path="/pathway" component={Pathway} />
              <Route exact path="/explore" component={Explore} />
              <Route exact path="/about" component={About} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
