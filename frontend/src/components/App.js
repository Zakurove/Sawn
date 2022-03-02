import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

//Alert OPTIONS
const alertOptions = {
  timeout: 3000,
  position: 'top center'
}

//Redux Stuff
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from '../actions/auth.js';

//Components
import Header from "./layout/Header.js";
import Footer from "./layout/Footer.js";
import Alerts from "./layout/Alerts.js";
import Login from "./accounts/Login.js";
import Register from "./accounts/Register.js";
import PrivateRoute from "./common/PrivateRoute.js";
import MainPage from "./common/MainPage.js";


import ListEpisodes from "./episodes/ListEpisodes.js";
import MyEpisodes from "./episodes/MyEpisodes.js";
import DetailsEpisode from "./episodes/DetailsEpisode.js";



class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={ AlertTemplate }
        {...alertOptions}>
          <Router>
            <Fragment>
            <Alerts />
              <Header />
              
              <div>
                <Switch>
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/" component={MainPage} />


                  <Route exact path="/seizures" render={(props) => <ListEpisodes {...props} condition={`Seizures`}/>} />
                  <Route exact path="/seizures/episodes/:id" render={(props) => <DetailsEpisode {...props} condition={`Seizures`} />} />

                  <Route exact path="/cardiovascular" render={(props) => <ListEpisodes {...props} condition={`Cardiovascular`}/>} />
                  <Route exact path="/cardiovascular/episodes/:id" render={(props) => <DetailsEpisode {...props} condition={`Cardiovascular`} />} />

                  <Route exact path="/diabetes" render={(props) => <ListEpisodes {...props} condition={`Diabetes`}/>} />
                  <Route exact path="/diabetes/episodes/:id" render={(props) => <DetailsEpisode {...props} condition={`Diabetes`} />} />

                  <Route exact path="/headache" render={(props) => <ListEpisodes {...props} condition={`Headache`}/>} />
                  <Route exact path="/headache/episodes/:id" render={(props) => <DetailsEpisode {...props} condition={`Headache`} />} />

                  <Route exact path="/episodes/details/episodes/:id" component={DetailsEpisode} />
                  <Route exact path="/myepisodes" component={MyEpisodes} />
                  <Route exact path="/myepisodes/:id" render={(props) => <DetailsEpisode {...props} condition={`.`}/>} />

                </Switch>
              </div>
              <Footer />
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

