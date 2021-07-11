import React from "react";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import store from "./redux/store";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/home/Home";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Switch>
          <Route exact path="/">
            <Wrapper />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
